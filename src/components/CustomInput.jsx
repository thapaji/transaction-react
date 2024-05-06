import Form from "react-bootstrap/Form";

export const CustomInput = ({ label, options, ...rest }) => {
  return (
    <Form.Group className="mb-3">
      



      <Form.Label>{label}</Form.Label>
      {rest.type === "select" ? (
        <Form.Control as="select" {...rest}>
          {options.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </Form.Control>
      ) : (
        <Form.Control {...rest} />
      )}
    </Form.Group>
  );
};
