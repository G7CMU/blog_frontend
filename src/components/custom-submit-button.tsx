import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Form } from 'antd';

type SubmitButtonProps = {
  form: FormInstance;
};

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
      <Button type="primary" htmlType="submit" disabled={!submittable} className={"w-full text-xl h-auto"}>
        {children}
      </Button>
  );
};

export default SubmitButton;