import { Table, Thead, Tr, Th, Tbody, Td } from "./index";
import { FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import axios from "axios";

function Grid({ users, setUsers, setOnEdit }) {
  const handleEdit = (item) => {
    setOnEdit(item)
  }

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({data}) => {
        const newArray = users.filter((user) => user.id !== id)

        setUsers(newArray)
        toast.success(data)
      })
      .catch(({data}) => toast.error(data))

      setOnEdit(null)
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>E-mail</Th>
          <Th onlyweb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="30%">{item.fone}</Td>
            <Td width="5%" alignCenter onClick={() => handleEdit(item)}>
              <FaEdit />
            </Td>
            <Td width="5%" alignCenter onClick={() => handleDelete(item.id)}>
              <FaTrash />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

Grid.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fone: PropTypes.string.isRequired,
    data_nasc: PropTypes.string.isRequired
  })),
  setUsers: PropTypes.func.isRequired,
  setOnEdit: PropTypes.func.isRequired
};

export default Grid;
