import { styled } from 'goober'

const formatDate = (date: Date) =>  Intl.DateTimeFormat("en", { dateStyle: 'long'}).format(date);

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

const DateAnnotation = styled('span')`
  color: #A6A7A7;
  font-size: 0.8rem;
`;

export default function Dates(props: { createdAt: string; updatedAt: string }) {
  const createdAtDate = new Date(props.createdAt)
  return (
    <Wrapper>
      <DateAnnotation>Written on <time datetime={props.createdAt}>{formatDate(createdAtDate)}</time></DateAnnotation>
      {props.updatedAt && <DateAnnotation>Last updated on <time datetime={props.updatedAt}>{formatDate(new Date(props.updatedAt))}</time></DateAnnotation>}
    </Wrapper>
  );

}
