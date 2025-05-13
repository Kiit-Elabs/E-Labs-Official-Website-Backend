import {
  addToast,
  Button,
  Form,
  Image,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";
import {
  FaCamera,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const designations = [
  { label: "Coordinator", value: "coordinator" },
  { label: "Assistant Coordinator", value: "asst_coordinator" },
  { label: "Lead", value: "lead" },
  { label: "Assistant Lead", value: "asst_lead" },
  { label: "Member", value: "member" },
];

const domains = [
  { label: "Web Development", value: "web_dev" },
  { label: "Android Development", value: "android" },
  { label: "UI/UX", value: "ui_ux" },
  { label: "Graphic Designing", value: "graphic" },
  { label: "AI/ML", value: "ml" },
  { label: "AR/VR & Game Development", value: "arvr_game" },
  { label: "Java", value: "java" },
  { label: "IoT & Embedded Systems", value: "iot" },
  { label: "Cloud Computing", value: "cloud" },
  { label: "Marketing & PR", value: "marketing" },
  { label: "Content Writing", value: "content" },
  { label: "Photography & Video Editing", value: "photography" },
  { label: "Cyber Security", value: "cyber_sec" },
  { label: "Data Analytics", value: "data_anal" },
];

function NameInput() {
  return (
    <Input
      label="Full Name"
      variant="bordered"
      isClearable
      name="name"
      color="warning"
      isRequired
      classNames={{
        label: "text-md",
        errorMessage: "text-left text-[13px]",
      }}
    ></Input>
  );
}

function DesignationInput() {
  return (
    <Select
      label="Designation"
      variant="bordered"
      color="warning"
      name="designation"
      isRequired
      classNames={{
        popoverContent: "dark font-varela",
        label: "text-md",
        errorMessage: "text-left text-[13px]",
      }}
      scrollShadowProps={{
        hideScrollBar: false,
      }}
    >
      {designations.map((item) => (
        <SelectItem
          key={item.label}
          variant="faded"
          color="warning"
          classNames={{ title: "text-md" }}
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}

function DomainInput() {
  return (
    <Select
      label="Domain"
      variant="bordered"
      color="warning"
      description="Select all domains that you belong to"
      name="domain"
      selectionMode="multiple"
      isRequired
      classNames={{
        popoverContent: "dark font-varela",
        label: "text-md",
        errorMessage: "text-left text-[13px]",
        description: "text-left text-[13px]",
      }}
      scrollShadowProps={{
        hideScrollBar: false,
      }}
    >
      {domains
        .sort((d1, d2) => d1.label.localeCompare(d2.label))
        .map((item) => (
          <SelectItem
            key={item.value}
            color="warning"
            variant="faded"
            classNames={{ title: "text-md" }}
          >
            {item.label}
          </SelectItem>
        ))}
    </Select>
  );
}

function ImageInput() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <>
      <Image
        className="object-cover flex aspect-square h-[174px] shadow-lg shadow-textColor1 mb-6"
        src={
          previewUrl ||
          "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.webp"
        }
        alt="member_image"
        radius="lg"
      />
      <Input
        label="Upload Image"
        isRequired
        name="image"
        variant="flat"
        description="Max size: 10 MB"
        size="lg"
        labelPlacement="outside"
        isClearable
        color="warning"
        classNames={{
          label: "text-md",
          description: "text-left text-[13px]",
          errorMessage: "text-left text-[13px]",
        }}
        startContent={<FaCamera className="text-lg text-textColor1" />}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      ></Input>
    </>
  );
}

function SocialsInput() {
  return (
    <>
      <Input
        label="LinkedIn Profile"
        variant="bordered"
        isClearable
        name="linkedin"
        placeholder="https://www.linkedin.com/in/username"
        color="warning"
        classNames={{ label: "text-md" }}
        startContent={<FaLinkedinIn className="text-lg text-textColor1" />}
        type="url"
      ></Input>
      <Input
        label="GitHub Profile"
        variant="bordered"
        isClearable
        placeholder="https://github.com/username"
        name="github"
        color="warning"
        classNames={{ label: "text-md" }}
        startContent={<FaGithub className="text-lg text-textColor1" />}
        type="url"
      ></Input>
      <Input
        label="Instagram Profile"
        name="instagram"
        variant="bordered"
        isClearable
        placeholder="https://www.instagram.com/username"
        color="warning"
        classNames={{ label: "text-md" }}
        startContent={<FaInstagram className="text-lg text-textColor1" />}
        type="url"
      ></Input>
    </>
  );
}

function ConnectionsInput() {
  return (
    <>
      <Input
        label="KIIT Email Address"
        variant="bordered"
        isClearable
        isRequired
        name="email"
        color="warning"
        classNames={{
          label: "text-md",
          errorMessage: "text-left text-[13px]",
        }}
        startContent={<FaEnvelope className="text-lg text-textColor1" />}
        type="email"
      ></Input>
      <Input
        label="Phone Number"
        variant="bordered"
        isClearable
        isRequired
        name="phone"
        color="warning"
        classNames={{
          label: "text-md",
          errorMessage: "text-left text-[13px]",
        }}
        startContent={<FaPhoneAlt className="text-lg text-textColor1" />}
        type="tel"
      ></Input>
    </>
  );
}

function ActionButtons({ isLoading }) {
  return (
    <>
      <Button
        className="w-full max-w-[250px] hover:scale-105 transition-all ease-in-out duration-200 font-bold text-xl"
        type="submit"
        variant="shadow"
        isDisabled={isLoading}
        color="warning"
        radius="lg"
        size="lg"
        startContent={
          isLoading && <Spinner color="default" variant="gradient" />
        }
      >
        Submit
      </Button>
      <Button
        className="w-full max-w-[250px] hover:scale-105 transition-all ease-in-out duration-200 font-bold text-xl"
        type="reset"
        variant="faded"
        radius="lg"
        isDisabled={isLoading}
        color="warning"
        size="lg"
      >
        Reset
      </Button>
    </>
  );
}

export default function InputForm() {
  const navigate = useNavigate();

  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!submittedData) return;

    const sendRequest = async () => {
      setIsLoading(true);

      const data = await fetch(import.meta.env.VITE_MEMBER_URI, {
        method: "POST",
        body: submittedData,
      });

      const parsedData = await data.json();

      if (data.status !== 200) {
        addToast({
          title: "Failed to submit. Please try again.",
          color: "danger",
          className: "dark",
          classNames: {
            title: "font-varela text-left",
          },
          radius: "lg",
          onClose: () => {
            window.location.reload();
          },
        });
        setSubmittedData(null);
      } else {
        addToast({
          title: "Submitted Successfully!",
          className: "dark",
          classNames: {
            title: "font-varela text-left",
          },
          radius: "lg",
          endContent: (
            <Button
              variant="shadow"
              color="success"
              className="dark"
              onPress={() => {
                navigate(`/user/${parsedData.userId}`);
              }}
            >
              <div className="w-full">
                <h1 className="text-sm font-medium font-varela leading-tight text-wrap">
                  Download Virtual ID
                </h1>
              </div>
            </Button>
          ),
          color: "success",
          timeout: 60000,
          onClose: () => {
            window.location.reload();
          },
        });
      }

      setIsLoading(false);
    };

    sendRequest();
  }, [submittedData]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmittedData(data);
  };

  return (
    <div>
      <div className="py-20">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-textColor1 text-4xl md:text-5xl font-bold text-center w-full">
            Member Details
          </h1>
        </div>
        <div className="mt-10 rounded-xl border-textColor1 border-2 py-16 px-10 flex flex-col items-center justify-center gap-14 overflow-x-hidden w-full">
          <Form
            className="w-full flex flex-col items-center justify-center gap-14"
            validationBehavior="native"
            onReset={() => {
              setSubmittedData(null);
            }}
            onSubmit={onSubmit}
          >
            <div className="w-full flex flex-row flex-wrap-reverse items-center justify-between gap-10">
              <div className="flex w-full md:w-[50%] flex-col gap-6 items-center justify-center">
                <NameInput />
                <DesignationInput />
                <DomainInput />
                <SocialsInput />
              </div>

              <div className="flex w-full md:w-[40%] flex-col gap-6 items-center justify-center">
                <ImageInput />
                <ConnectionsInput />
              </div>
            </div>

            <div className="flex w-full items-center justify-center flex-wrap flex-row gap-8">
              <ActionButtons isLoading={isLoading} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
