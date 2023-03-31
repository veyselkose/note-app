export default function fitcontenxt(e) {
  e.target.style.height = "";
  e.target.style.height = e.target.scrollHeight + "px";
}

export const sortItems = (a, b) => b.id - a.id;

