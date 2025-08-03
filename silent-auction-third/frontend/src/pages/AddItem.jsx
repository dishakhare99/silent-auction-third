import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ItemForm from "../components/ItemForm.jsx";

function AddItem(props) {

  return (
    <>
      <Header auth={props.auth} admin={props.admin} runCheck={props.runCheck} />
      <ItemForm />
      <Footer />
    </>
  );
}

export default AddItem;
