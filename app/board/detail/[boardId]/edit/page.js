import BoardWriteUI from '@/app/board/components/boardWriteUI';

export default function BoardEdit(props) {
  return <BoardWriteUI isEdit={true} eidtData={props.data} />;
}
