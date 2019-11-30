import React from "react";
import "./App.css";
import "@reach/dialog/styles.css";
import { Dialog } from "@reach/dialog";
import { useFormik } from "formik";

export default function App() {
  let [openDialog, open] = React.useState(null);
  let close = () => open(null);

  return (
    <div>
      <h1>Reach Dialog + Formik</h1>

      <p>This one works</p>
      <button onClick={() => open(1)}>Open</button>
      {openDialog === 1 && (
        <Dialog aria-label="Meal form" onDismiss={close}>
          <Form />
        </Dialog>
      )}

      <p>So does this one</p>
      <button onClick={() => open(2)}>Open</button>
      {openDialog === 2 && <FormDialogSeparateComponents close={close} />}

      <p>But this one doesn't</p>
      <button onClick={() => open(3)}>Open</button>
      {openDialog === 3 && <FormDialogSameComponent close={close} />}
    </div>
  );
}

function Form() {
  const formik = useFormik({
    initialValues: {
      item: "",
      date: "2014-01-01"
    }
  });

  return (
    <>
      <h2>New Meal</h2>

      <form>
        <input {...formik.getFieldProps("item")} placeholder="Item" />
        <input {...formik.getFieldProps("date")} placeholder="Date" />

        <div>
          <button type="submit">Save it!</button>
        </div>
      </form>
    </>
  );
}

function FormDialogSeparateComponents({ close }) {
  return (
    <Dialog aria-label="Meal form" onDismiss={close}>
      <Form />
    </Dialog>
  );
}

function FormDialogSameComponent({ close }) {
  const formik = useFormik({
    initialValues: {
      item: "",
      date: "2014-01-01"
    }
  });

  return (
    <Dialog aria-label="Meal form" onDismiss={close}>
      <h2>New Meal</h2>

      <form>
        <input {...formik.getFieldProps("item")} placeholder="Item" />
        <input {...formik.getFieldProps("date")} placeholder="Date" />

        <div>
          <button type="submit">Save it!</button>
        </div>
      </form>
    </Dialog>
  );
}
