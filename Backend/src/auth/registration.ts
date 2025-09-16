import * as bcrypt from 'bcrypt';

// Hash password before saving
const hashedPassword = await bcrypt.hash(password, 10);

// Verify password on login
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
