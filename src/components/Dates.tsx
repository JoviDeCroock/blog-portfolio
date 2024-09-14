const writeDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// TODO: text-color and smaller font
export default function Dates(props: { createdAt: string; updatedAt: string }) {
  const createdAtDate = new Date(props.createdAt)
  return (
    <div>
      <span>Written on <time datetime={props.createdAt}>{writeDate(createdAtDate)}</time></span>
      {props.updatedAt && <span>Last updated on <time datetime={props.updatedAt}>{writeDate(new Date(props.updatedAt))}</time></span>}
    </div>
  );

}
