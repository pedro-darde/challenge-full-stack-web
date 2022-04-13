export default function throttle(time, handler) {
  let id;

  return (...args) => {
    if (id != null) {
      clearTimeout(id);
    }

    id = setTimeout(() => handler(...args), time);
  };
}
