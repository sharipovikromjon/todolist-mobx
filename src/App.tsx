import { Layout } from "antd";
import { TodoList } from "./components/Todo";

const App = () => {
  return (
    <Layout style={{paddingBottom:"100px"}}>
      <TodoList />
    </Layout>
  );
};

export default App;
