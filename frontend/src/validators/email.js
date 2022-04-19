export default function emailValidator(email) {
  const emailRegex = /.+@.+/;
  return emailRegex.test(email);
}
