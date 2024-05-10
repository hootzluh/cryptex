const crypto = require('crypto');

function generateKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}

function encryptFile(filePath, password) {
  const { key, salt } = generateKey(password, crypto.randomBytes(16));
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(filePath + '.encrypted');

  input.pipe(cipher).pipe(output);

  output.on('finish', () => {
    // Prepend salt and IV to the encrypted file for decryption
    const fileContents = fs.readFileSync(filePath + '.encrypted');
    const combinedData = Buffer.concat([salt, iv, fileContents]);
    fs.writeFileSync(filePath + '.encrypted', combinedData);
  });
}

function decryptFile(filePath, password) {
  const fileContents = fs.readFileSync(filePath);

  // Extract salt and IV
  const salt = fileContents.slice(0, 16);
  const iv = fileContents.slice(16, 32);
  const encryptedData = fileContents.slice(32);

  const key = generateKey(password, salt);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(filePath.slice(0, -9)); // Remove '.encrypted' extension

  input.pipe(decipher).pipe(output);
}

module.exports = { encryptFile, decryptFile };
