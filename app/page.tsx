import  List  from './components/List';
import activity from "../app/data/data.json"


export default function Home() {
  return (
    <>
      <List activity={activity} />
    </>
  );
}
