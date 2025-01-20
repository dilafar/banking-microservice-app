/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useUpdateLoan } from "../../hooks/loans/useUpdateLoans";

function CreateLoansForm({cabinToEdit = {},onCloseModel}) {
  const {mobileNumber:editId} = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? cabinToEdit : {},
  });

  const { errors } = formState;
  console.log(errors);

  const {updateLoan } = useUpdateLoan();

  

  function onSubmit(data) {
    if(isEditSession){
      updateLoan(data,{
        onSuccess: (data) =>{
          console.log(data);
          reset();
          onCloseModel?.();
        } 
      })
    }
   console.log(data);
  }

  function onError(error){
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModel ? "model":"regular"}>
    <FormRow label="Loan Number" error={errors?.loanNumber?.message}>
          <Input
            type="text"
            id="loanNumber"
            readOnly
            {...register("loanNumber", {
              required: "This field is required",
            })}
          />
      </FormRow>

      {isEditSession && (
        <>
          <FormRow label="mobileNumber" error={errors?.mobileNumber?.message}>
            <Input
              type="text"
              id="mobileNumber"
              {...register("mobileNumber", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Loan Type" error={errors?.loanType?.message}>
              <select
                id="loanType"
                {...register("loanType", {
                  required: "This field is required",
                })}
              >
                <option value="">Select Loan Type</option>
                <option value="home">Home Loan</option>
                <option value="educational">Educational Loan</option>
                <option value="personal">Personal Loan</option>
                <option value="auto">Auto Loan</option>
              </select>
          </FormRow>

          <FormRow label="TotalLoan" error={errors?.totalLoan?.message}>
            <Input
              type="number"
              id="totalLoan"
              {...register("totalLoan", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity should be at least 1",
                },
              })}
            />
          </FormRow>

          <FormRow label="AmountPaid">
            <Input
              type="number"
              id="amountPaid"
              {...register("amountPaid", {
                required: "This field is required",
              
              })}
            />
          </FormRow>

          <FormRow label="outstandingAmount" error={errors?.outstandingAmount?.message}>
            <Input
              type="number"
              id="outstandingAmount"
              {...register("outstandingAmount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity should be at least 1",
                },
              })}
            />
          </FormRow>

        </>
      )}
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModel?.()}>
          Cancel
        </Button>
        <Button >
          {isEditSession ? "Edit Loan": "Create new Loan"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateLoansForm;