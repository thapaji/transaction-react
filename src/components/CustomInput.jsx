import Form from "react-bootstrap/Form";

export const CustomInput = ({ label, options, ...rest }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {rest.type === "select" ? (
        <Form.Select as="select" {...rest}>
          <option value={''}>------SELECT-------</option>
          {options.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control {...rest} />
      )}
    </Form.Group>
  );
};
