"use client";
import ImageComponent from "./components/ImageComponent";
import Input from "./components/common/Input";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../services/axios";
import { API_ROUTES } from "../lib/api.route";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agreed: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /**
   * Handle input change event
   */
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Handle form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(API_ROUTES.register, {
        email: formData.email,
        agreed: formData.agreed,
      });

      if (response.status === 200) {
        localStorage.setItem("email", formData.email);
        setMessage("Redirecting to verify email page...");
        setMessageType("success");
        setTimeout(() => router.push("/components/verify-email"), 3000);
      } else {
        setMessage("Failed to register. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Something went wrong. Try again.");
      setMessageType("error");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center m-8">Chat with John</h1>
      <ImageComponent />
      <form
        className="flex flex-col items-center gap-5 p-5"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleInputChange}
          label={"name"}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleInputChange}
          label={"email"}
        />
        <div className="flex gap-5 justify-between items-center">
          <Input
            type="checkbox"
            name="agreed"
            onChange={handleInputChange}
            placeholder={"I agree to the terms & conditions"}
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      {message && (
        <p
          className={`text-center ${
            messageType === "error" ? "text-red-400" : "text-black-300"
          } underline`}
        >
          {message}
        </p>
      )}
    </>
  );
}

//! Without using the react-scroll-parallax package  (Scrolling)

// import React, { useEffect, useRef, useState } from "react";

// const Page = () => {
//   const leftRef = useRef(null);
//   const rightRef = useRef(null);
//   const parentRef = useRef(null);
//   const [parentScrollAllowed, setParentScrollAllowed] = useState(false);
//   const [position, setPosition] = useState("sticky");

//   useEffect(() => {
//     const child = leftRef.current;
//     const parent = rightRef.current;

//     function handleLeftScroll(e) {
//       if (parentScrollAllowed && child) {
//         // Scroll the child manually
//         child.scrollTop += e.deltaY;

//         // Check if child scroll is at the bottom
//         const isChildScrolledToEnd =
//           Math.ceil(child.scrollTop + child.clientHeight) >= child.scrollHeight;

//         if (isChildScrolledToEnd) {
//           setParentScrollAllowed(true); // Unlock parent scrolling
//         }

//         e.preventDefault(); // Stop default scrolling behavior
//       }
//     }

//     function handleRightScroll(e) {
//       if (parent && child) {
//         // If user scrolls back to the very top, reset the child's scroll position
//         if (parent.scrollTop === 0) {
//           child.scrollTop = 0;
//           setParentScrollAllowed(false); // Lock parent scrolling again
//         }
//       }
//     }

//     function handleScroll(e) {
//       const isGlobalScrollToEnd =
//         Math.ceil(
//           parentRef.current.scrollTop + parentRef.current.clientHeight
//         ) >= 600;

//       if (isGlobalScrollToEnd) {
//         setPosition("");
//       } else {
//         setPosition(position);
//       }
//     }

//     parentRef?.current?.addEventListener("scroll", handleScroll);

//     leftRef?.current?.addEventListener("scroll", handleLeftScroll);
//     rightRef?.current?.addEventListener("scroll", handleRightScroll);

//     return () => {
//       leftRef?.removeEventListener("scroll", handleLeftScroll);
//       rightRef?.removeEventListener("scroll", handleRightScroll);
//     };
//   }, [parentScrollAllowed]);

//   return (
//     <div
//       className="flex gap-10 justify-between h-50 overflow-y-scroll w-full"
//       ref={parentRef}
//     >
//       <aside
//         className={`h-48 mx-5 w-1/2 ${position} top-0 overflow-hidden transition-all duration-1000 ease-in-out`}
//         ref={rightRef}
//       >
//         <p className="bg-red-100">
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
//           facere numquam, maiores dolorem, nam distinctio, quibusdam at quidem
//           aliquid alias obcaecati unde ab minus inventore nostrum dolores.
//           Officia nulla voluptates, consequuntur fugiat voluptate reiciendis
//           suscipit voluptas est facilis optio, facere, ipsum inventore velit
//           minus non unde. Quidem, sequi velit. Non impedit esse porro maiores,
//           dolorem quibusdam cumque nostrum molestiae? Expedita laborum molestias
//           incidunt facilis eveniet. Pariatur, explicabo! Ducimus temporibus
//           totam nisi, debitis possimus tenetur nihil accusamus delectus veniam,
//           sed inventore eaque at deserunt optio quod asperiores ipsam earum modi
//           natus ipsa consectetur iure porro eveniet facilis! Consequatur dolorum
//           odio eius! Lorem ipsum dolor sit amet consectetur adipisicing elit.
//           Dignissimos optio perferendis quo veritatis ut adipisci officia culpa
//           aspernatur corporis repellat, sit necessitatibus facilis iusto
//           officiis consequuntur mollitia minima eos unde neque, dolore placeat,
//           nulla ducimus! Mollitia deleniti et neque iusto, odit iste doloribus
//           enim fugit nulla atque assumenda ad velit quisquam odio recusandae
//           nesciunt ut quia? Exercitationem optio explicabo blanditiis omnis modi
//           sit voluptatem. Quia ipsa a aut ea dicta totam magnam molestiae sed,
//           iure, consequuntur enim autem corrupti beatae laborum tenetur,
//           repellendus commodi cupiditate quasi blanditiis! Eius sed quos, ut
//           vitae eum nesciunt est suscipit placeat odit necessitatibus tempora
//           quidem, id voluptas. Quibusdam itaque ullam sapiente deserunt iusto
//           atque. Totam suscipit rerum, consequuntur voluptatum atque ipsum ut
//           reiciendis delectus facilis debitis possimus aliquid quam sequi
//           consequatur quibusdam optio molestiae dignissimos tempora esse dolor.
//           At sequi distinctio, tenetur consectetur deserunt temporibus. Expedita
//           eveniet cumque atque cupiditate. Commodi, odio odit! Minima, quidem
//           molestias quasi corporis assumenda incidunt eos et dolorem, sequi modi
//           dolores dolorum laborum earum deserunt iusto neque, hic in. Voluptate
//           harum, tempora ea dicta maxime possimus animi voluptatum accusantium
//           est soluta, ipsa iusto earum quis nemo magni? Natus veniam
//           reprehenderit quisquam quos quam reiciendis, quasi incidunt esse
//           repudiandae nihil accusamus debitis suscipit? Expedita vel nostrum
//           fuga, laborum praesentium quasi ad incidunt delectus quisquam? Animi
//           dolorum quo modi, in reprehenderit fuga accusantium quod velit
//           perspiciatis dolore. Reiciendis ex explicabo rem, impedit, molestias
//           aut rerum deserunt vitae sunt quia maiores provident labore iusto
//           veniam voluptatem cumque, animi ipsum perferendis temporibus unde
//           possimus eos. Voluptate quasi officiis rerum necessitatibus similique
//           dolore natus perspiciatis, laudantium illum exercitationem nostrum
//           eaque dicta accusamus sit. Culpa, facilis aspernatur quo fuga harum
//           ipsam reprehenderit eveniet dolorum non dignissimos. Dicta quo dolorum
//           animi hic tempora, fuga sit iste similique molestiae modi sequi
//           obcaecati nihil officiis neque rem, provident non! Qui, ea ut rerum
//           repellendus, magni sit eum possimus eligendi inventore quis dolores
//           consequuntur recusandae vitae molestias ad at, suscipit distinctio.
//           Libero excepturi corporis neque placeat fugit consequuntur dolor,
//           impedit fuga sint ea exercitationem, ullam minus, dolores expedita
//           laudantium quidem nam sequi quo! Eius ipsa enim dolores ab! Qui, omnis
//           sit, soluta perferendis dolorem, quis at exercitationem rerum ad
//           assumenda officia cupiditate atque reprehenderit dolorum neque sed vel
//           tenetur odio! Exercitationem quos est nostrum. Reiciendis sequi
//           dolores repudiandae aperiam, quaerat laboriosam quos aliquid
//           voluptatum placeat. Dignissimos corporis quam quisquam ipsam
//           distinctio perspiciatis, enim placeat fugiat in, ipsum voluptate,
//           repellendus mollitia veniam eius iusto vitae excepturi ut consequatur
//           ab repudiandae modi. Quas temporibus, provident, a error saepe
//           voluptatibus asperiores nostrum tenetur quam obcaecati doloribus, iure
//           ab. Sed iusto illum ad id ut! Iste dicta vero inventore nobis
//           similique corporis itaque, perferendis minima animi commodi officiis
//           hic quas, consectetur perspiciatis eaque dolorum quibusdam, molestiae
//           et suscipit quos tempora. Necessitatibus cumque aut soluta dolores!
//           Saepe, porro. Error, delectus exercitationem cumque in nulla
//           inventore! Ipsum natus sint soluta perferendis nam unde in facilis,
//           praesentium cupiditate alias est, veniam, et a sequi quaerat! Minus
//           accusamus et cumque? Voluptatem, similique inventore iste iusto
//           consectetur quibusdam cumque a libero! Deserunt, ipsam voluptas ab
//           dolorem pariatur animi nemo nulla ducimus officiis repellendus earum
//           voluptatum quidem illum aut, reiciendis, non eius? Sapiente laborum
//           voluptate, nostrum nulla dolorum ipsam, blanditiis repudiandae aliquid
//           facere exercitationem maiores alias accusantium veritatis voluptates
//           ut eius! Molestiae eius maxime veniam dolor aut, pariatur laudantium
//           amet sequi? Praesentium nisi itaque error delectus ipsa, ut saepe
//           perferendis esse. Tempore nisi praesentium laboriosam quos voluptatum
//           excepturi maxime provident nobis incidunt possimus eius eveniet enim
//           quidem quis blanditiis recusandae suscipit, odio rerum! Minus atque
//           cumque, corporis recusandae quis quae ullam reiciendis animi, nam sunt
//           voluptates beatae hic nihil porro eum itaque facilis ut commodi
//           laboriosam veritatis sequi unde tempore. Consectetur impedit quod unde
//           rem delectus tenetur iusto expedita nemo modi earum explicabo nostrum
//           hic pariatur, non cupiditate, dicta nihil natus. Explicabo dolores,
//           veritatis quisquam accusantium ut inventore aliquid consectetur sit
//           quae, esse odio reprehenderit eos nam sequi quibusdam perspiciatis
//           voluptatem. Nesciunt hic officiis soluta quia, sed sit ipsam adipisci!
//           Distinctio non quasi, voluptates beatae corrupti asperiores esse
//           eveniet tempore ipsam itaque saepe natus similique quas rerum iste ea
//           consectetur totam ipsa? Excepturi rerum obcaecati inventore
//           asperiores, ipsum cumque facere distinctio id dignissimos, cum optio,
//           ducimus eligendi neque harum laborum sed necessitatibus saepe vero
//           iure incidunt! Assumenda repellendus blanditiis deleniti tenetur vero
//           quibusdam ipsum ab molestiae, aliquid similique eius, rerum asperiores
//           voluptatibus illum doloremque autem illo ex. Deleniti, velit delectus!
//           Mollitia quibusdam vitae, minus reiciendis asperiores architecto
//           accusamus sequi. Modi, assumenda. Fugiat delectus fugit eligendi
//           suscipit quas fuga voluptatem sequi, temporibus odit, voluptate saepe
//           dicta laboriosam explicabo vero inventore? Voluptas velit sapiente
//           fugiat omnis, quisquam id eum ipsam tempora! Magnam, ratione molestias
//           repellat non optio possimus odit error, ab placeat ullam fugiat! Ea
//           vero laudantium, nostrum, nesciunt error quod voluptas, maiores rerum
//           perspiciatis ut qui. Hic ipsum earum voluptatem debitis in quae dolore
//           voluptas odit iusto nobis accusantium aliquid amet, numquam quidem
//           error voluptate laborum nisi quasi omnis quisquam veritatis deserunt
//           necessitatibus quibusdam! Voluptatum, totam ab vitae labore deserunt
//           dolores, numquam, laborum provident alias quia tempora dignissimos
//           aperiam in? Commodi nulla blanditiis odio nam, animi exercitationem
//           expedita quo soluta perspiciatis ducimus ipsum quidem voluptas impedit
//           natus hic voluptatibus molestiae reiciendis quas eveniet vitae, neque
//           reprehenderit suscipit tenetur. Ab voluptatem esse, hic aut pariatur
//           nam culpa commodi ducimus in sequi eligendi! Tempore quibusdam atque
//           commodi ipsa iste? Mollitia, ab itaque quidem asperiores, blanditiis
//           maxime deleniti repellendus alias laboriosam quae voluptatibus iure,
//           consectetur amet adipisci. Minima autem debitis earum maiores,
//           suscipit placeat possimus quae rem dolor dicta quisquam nihil illum?
//           Officiis, magni maxime accusantium corporis sint placeat, eveniet ipsa
//           consequuntur necessitatibus animi pariatur deleniti aspernatur non
//           voluptatibus suscipit similique. Voluptate nihil eveniet magnam nobis
//           vero similique esse laborum iste? Magnam numquam quibusdam reiciendis,
//           accusantium deleniti rem fugit, architecto id repellendus, maiores
//           illo iure adipisci a ea! Sint placeat, dolores possimus quasi illum
//           debitis dicta expedita quae obcaecati officiis at vitae vel non rem
//           voluptatem suscipit dolore? Voluptates nesciunt aut sunt tenetur hic.
//           Ducimus, unde tempore? Laudantium, dolorem. Architecto delectus dolor
//           voluptas.
//         </p>
//       </aside>

//       <aside ref={leftRef} className={`h-48 mx-5 w-1/2  transition-all`}>
//         <p className="bg-red-200">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe minima
//           ex, porro quos aspernatur in, optio laudantium eius tenetur vel
//           perferendis doloremque cupiditate quam modi deserunt fugit iusto rem
//           deleniti itaque. Modi labore sed accusantium ipsam unde sint nulla
//           velit. Esse neque quis nulla placeat reprehenderit incidunt totam
//           velit, inventore odit, non dicta laboriosam asperiores provident
//           illum, eligendi cum in porro. Harum consequatur ratione expedita
//           aperiam fugit at explicabo consequuntur laboriosam fugiat odit quia
//           animi doloremque voluptatum, dolore commodi neque, perferendis facere
//           in vero. Consectetur, accusamus odio aliquid assumenda velit quaerat
//           delectus numquam optio dicta nisi non consequuntur alias natus! Lorem
//           ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dolor
//           voluptatum quas sapiente ad quisquam velit officia dolore veniam
//           omnis? Excepturi rerum corporis quisquam deleniti, odit sunt tempora
//           illum temporibus optio doloribus laboriosam assumenda soluta minus
//           dignissimos consequuntur aperiam cum reiciendis ut unde facere dolores
//           deserunt laborum! Et earum exercitationem, ducimus quis quasi minima,
//           saepe porro totam ipsum tempore quia consequatur. Quas nisi dolorem
//           blanditiis odit obcaecati quo unde impedit autem illo! Quos eos autem
//           iure, repellat quasi tempora, doloremque ea, iusto reprehenderit porro
//           suscipit excepturi enim? Veritatis porro aperiam iusto laborum
//           accusamus dolorem ratione beatae numquam. Blanditiis ullam dolor eaque
//           voluptates consectetur sunt unde, deleniti totam, molestiae architecto
//           quidem ad dignissimos perferendis temporibus illo? Explicabo,
//           necessitatibus reprehenderit libero accusantium sed ea quia repellat
//           quae similique laborum maxime voluptatum corrupti molestiae, optio
//           nostrum sequi aut ab, dolores magni cum quas assumenda. Hic quaerat
//           incidunt nihil impedit laboriosam beatae ipsum aliquid, animi
//           laudantium possimus voluptatum eum minima illum quam perferendis
//           quisquam iste deleniti doloremque eligendi magnam dolore quidem!
//           Atque, recusandae? Et expedita quaerat autem cumque dolor dolorem
//           impedit perferendis facere quisquam quas voluptatibus corporis
//           reprehenderit voluptates, ut, ab illum quam nesciunt sit dolores magni
//           maxime suscipit. Quaerat earum culpa totam dignissimos provident esse
//           mollitia quis magni autem deserunt vel beatae placeat impedit, nam
//           recusandae exercitationem est, cupiditate nobis? Corporis, fugit
//           excepturi officiis porro corrupti nihil dolorum rerum! Officiis
//           laudantium repudiandae, expedita fugit natus maiores temporibus itaque
//           reprehenderit optio debitis ea, dignissimos accusamus autem ratione
//           quisquam sapiente, iure nam inventore ad voluptas quasi facilis omnis
//           repellendus. Praesentium minima ipsum voluptas doloribus asperiores
//           voluptatem provident neque sunt facilis quibusdam libero eius dolorum
//           doloremque saepe nobis repellat, laboriosam architecto, labore
//           consequatur sit velit magni quam repudiandae. Illo vitae quidem
//           architecto amet molestias nobis vel, quas nam dolor adipisci corrupti?
//           Numquam unde eaque molestiae reiciendis dignissimos rerum rem nostrum
//           ab, ut consectetur magnam, voluptatem quaerat quod minima, est
//           accusantium placeat voluptatibus fugit quis! Eius doloribus, magni,
//           molestias libero eos ratione qui fugit nemo obcaecati est ipsa dolorem
//           illo! Libero, impedit quia! Nesciunt tempora fuga id ad esse quae
//           accusantium vitae minus ipsum quaerat debitis labore modi commodi eum
//           illo nulla ipsam odit quidem excepturi atque delectus id quis minima
//           quasi odio. Aliquid nobis, cumque mollitia quibusdam ea laboriosam
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
//           dignissimos pariatur soluta consequuntur corrupti laudantium eos
//           repellendus dolorum odio sit saepe nam atque doloremque neque
//           excepturi labore quas fugit praesentium, voluptas quod ipsa? Non
//           sapiente accusamus impedit dolore, debitis quod sit pariatur, mollitia
//           similique, sint nihil? Natus nam eius, fugiat sequi nesciunt ipsa illo
//           quos quod dolorum esse eum tempore neque, quidem ab. Laudantium
//           inventore optio, quos id ipsum soluta beatae esse accusamus maxime sed
//           eum impedit odio cum repellat ex aspernatur ducimus! Itaque inventore
//           consectetur perferendis eos ut. Repudiandae mollitia laboriosam
//           facilis. Commodi, nam. Fuga tenetur dolore voluptatum consectetur unde
//           repellendus officiis porro accusamus molestias laborum velit quod,
//           aspernatur voluptate minus architecto laboriosam laudantium recusandae
//           illo tempora dolorem voluptatibus ratione. Eos, autem vitae
//           perspiciatis nulla ducimus optio impedit nesciunt natus quidem eaque
//           sed, doloribus libero voluptates. Enim consectetur illo facere fugit
//           vitae fuga praesentium quidem. Voluptas illum inventore mollitia
//           totam. Doloremque reiciendis eveniet quae maiores ea. Atque non ea
//           corrupti natus rem dolore esse ab possimus cumque voluptas dicta
//           doloremque perspiciatis deleniti, sapiente eaque in. A iste numquam
//           laudantium quibusdam amet! Suscipit magni at expedita accusantium
//           laboriosam similique ipsum nemo officia voluptatibus? Beatae maiores
//           magnam totam molestias reiciendis fuga dolorum incidunt ea laboriosam
//           natus odit deleniti placeat explicabo maxime mollitia, accusamus
//           excepturi hic nesciunt velit similique adipisci? Ea voluptatem maiores
//           quia nostrum omnis, quam, consequuntur magni eum dolorem possimus
//           saepe quasi? Obcaecati consequuntur alias dolorum at ipsum. Earum
//           quasi est, corrupti numquam, illo laborum ullam soluta alias, eaque
//           repellendus neque cum officiis voluptates omnis nihil quia aut
//           necessitatibus eum molestiae sint? Quae fugit odit exercitationem
//           nulla ipsa corrupti, eveniet expedita tenetur eius pariatur laboriosam
//           quaerat. Tempore velit excepturi in aliquam, vero alias nihil odit!
//           Recusandae voluptates dolores aperiam nemo perspiciatis nihil rerum
//           porro quos vitae error veritatis iure illum maxime ipsum ipsa dolorem
//           culpa beatae, nostrum assumenda? Earum alias modi, placeat asperiores
//           quasi in neque, sint et hic ipsa harum vel at rerum molestias odio,
//           ipsam repellat facere voluptas aliquid voluptatem inventore quia!
//           Natus fugit reiciendis, tenetur alias porro qui quibusdam vel ipsum
//           repudiandae. Distinctio assumenda fugiat voluptatum soluta aut non
//           natus repudiandae quos at dolorem nihil, earum eligendi officiis neque
//           iure cumque nesciunt corporis eius consequatur animi provident numquam
//           corrupti. Reprehenderit porro repellat adipisci, accusantium quis iste
//           quod similique perspiciatis veritatis eveniet ipsa tempore sunt.
//           Suscipit quasi placeat architecto quod, et iusto fugiat reprehenderit
//           harum facilis doloremque sed voluptates ducimus. Voluptatem corporis
//           in reiciendis esse minus nobis hic ea, numquam adipisci, sed vero quam
//           doloremque et vitae consequatur unde quidem aliquam atque, quas
//           veritatis non! Asperiores iure iusto modi eius quo iste sequi quasi
//           dolores praesentium quidem veritatis incidunt, saepe aspernatur
//           ratione odit commodi nulla fuga voluptas natus nesciunt ab neque
//           ducimus expedita. Enim ut fugit qui, sint quaerat similique sequi
//           temporibus eius obcaecati. Error consectetur quam culpa rem deserunt
//           corrupti repudiandae ad aliquid eveniet ex recusandae illum corporis
//           libero, praesentium consequuntur reprehenderit eos quae, non magnam
//           veniam, nam veritatis officiis sequi? Obcaecati officia quia harum
//           accusamus quam illo vel necessitapsum porro! Sit cumque, debitis
//           similique aperiam consectetur quod. Ratione excepturi ullam reiciendis
//           quaerat enim! exercitationem excepturi.
//         </p>
//       </aside>
//     </div>
//   );
// };

// export default Page;
