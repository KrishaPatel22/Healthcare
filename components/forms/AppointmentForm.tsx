"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Doctors } from "@/constants";
import { SelectItem } from "@radix-ui/react-select";
import Image from "next/image";
import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { createAppointment } from "@/lib/actions/appointment.action";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import SubmitButton from "@/components/ui/SubmitButton";

export const AppointmentForm = ({
    userId, patientId, type
}:{
    userId: string;
    patientId: string;
    type: "create"|"cancel"| "schedule";
}

) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation= getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician:"",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    let status;
    switch(type){
      case 'schedule':
        status='schedule';
        break;
      case 'cancel':
        status='cancelled';
        break;
      default:
        status='pending';
    }
    try {
      if(type==='create'&&patientId){
        const appointmentData ={
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        }
      const appointment = await createAppointment(appointmentData);
      if(appointment){
        form.reset();
        router.push(`/patirnts/${userId}/new-appointment/success?appointmentId=$
          {appointment.id}`);
      }
      }
    }
    catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  let buttonLabel;

  switch(type){
    case 'cancel':
      buttonLabel='Cancel Appointment'
      break;
    case 'create':
      buttonLabel='Create Appointment'
      break;
    case 'schedule':
        buttonLabel='Schedule Appointment'
        break;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header text-blue-400">New Appointments</h1>
          <p className="text-blue-500">Request a new appointment in 10 seconds... </p>
        </section>

        {type !== "cancel" && (
            <>
            <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a Doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER} 
            control={form.control}
            name="Schedule"
            label="Expected appointment Date"
            showTimeSelect  
            dateFormat="MM/dd/yyyy - h:mm aa"      
          >
            
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Reason for appointment"
            placeholder="Enter reason for appointment"
            />
            <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="note"
            label="Notes"
            placeholder="Enter notes"
            />

          </div>

          </CustomFormField>
            </>
        )}
        {type === "cancel" && (
          <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="cancellationReason"
          label="Reason for cancellation"
          placeholder="Enter reason ffor cancellation"
          />

        )

        }

        <SubmitButton isLoading={isLoading} className={`${type==='cancel' ?
        'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm