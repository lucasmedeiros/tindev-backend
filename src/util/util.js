const DEFAULT_LENGTH_SIZE = 16;

/**
 * Gera uma string aleatória a partir do tamanho.
 * 
 * @param {Number} length - tamanho da string aleatória que será gerada
 */
export const generateRandomString = (length = DEFAULT_LENGTH_SIZE) => {
  let string = '';

  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (let i = 0; i < length; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return string;
};