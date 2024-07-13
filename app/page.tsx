import Image from "next/image";
import LoginPage from "./loginpage";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <LoginPage></LoginPage>
      <Footer></Footer>
    </div>
  );
}
