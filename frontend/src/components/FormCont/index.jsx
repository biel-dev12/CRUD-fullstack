import { useRef, useEffect } from "react";
import { Form, InputArea, Label, Input, Button } from "./index";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

function FormCont({ onEdit, setOnEdit, getUsers }) {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nasc.value = onEdit.data_nasc;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nasc.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nasc: user.data_nasc.value,
        })
        .then(({ data }) => {
          toast.success(data);
        })
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nasc: user.data_nasc.value,
        })
        .then(({ data }) => {
          toast.success(data);
        })
        .catch(({ data }) => toast.error(data));
    }
    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nasc.value = "";

    setOnEdit(null)
    getUsers()
  };

  return (
    <Form ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nasc" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </Form>
  );
}

FormCont.propTypes = {
  onEdit: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      fone: PropTypes.string.isRequired,
      data_nasc: PropTypes.string.isRequired,
    })
  ),
  setOnEdit: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

export default FormCont;
