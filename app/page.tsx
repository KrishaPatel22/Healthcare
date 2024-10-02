import PatientForm from "@/components/forms/PatientForm";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
           src="/assets/icons/Health logo-full.svg"
           height={1000}
           width={1000}
           alt="patient"
           className="mb-14 h-12 w-fit"
          />
          < PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
           <p className="justify-items-end text-dark-600 xl:text-left">
           © 2024 Health+
           </p>
            <Link href="/?admin=true" className="text-blue-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/Health+board-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%] max-l-[100%]"
      />
    </div>
  )
}
