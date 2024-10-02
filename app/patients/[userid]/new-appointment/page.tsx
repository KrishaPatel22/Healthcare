import AppointmentForm from "@/components/forms/PatientForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/Types";

import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({params: {userId}}:SearchParamProps) {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860 px]">
          <Image 
           src="/assets/icons/Health logo-full.svg"
           height={1000}
           width={1000}
           alt="patient"
           className="mb-14 h-12 w-fit"
          />
          < AppointmentForm
          type="create"
          userId={userId}
          patientId={patient.$id}
           />
           <p className="justify-items-end text-dark-600 xl:text-left">
           © 2024 Health+
           </p>
          
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000} 
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  )
}
