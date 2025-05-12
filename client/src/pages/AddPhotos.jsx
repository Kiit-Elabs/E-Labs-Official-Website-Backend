import React from "react";
import {
  Input,
  Form,
  Button,
  Spinner,
  addToast,
  Select,
  SelectItem,
} from "@heroui/react";
import { FaCamera } from "react-icons/fa";

const AddPhotos = () => {
  const [submitted, setSubmitted] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(import.meta.env.VITE_GET_EVENT_URI);
      const data = await response.json();
      setEvents(
        data.events.sort((a, b) => {
          return b.name.localeCompare(a.name);
        })
      );
    };
    fetchEvents();
  }, []);

  React.useEffect(() => {
    if (!submitted) return;

    const sendRequest = async () => {
      setIsLoading(true);

      const data = await fetch(import.meta.env.VITE_ADD_PHOTOS_URI, {
        method: "POST",
        body: submitted,
      });

      if (data.status !== 200) {
        addToast({
          title: "Failed to submit. Please try again.",
          color: "danger",
          className: "dark",
          timeout: 6000,
          classNames: {
            title: "font-varela text-left",
          },
          radius: "lg",
        });
        setSubmitted(null);
      } else {
        document.querySelector("form").reset();
        addToast({
          title: "Submitted Successfully!",
          className: "dark",
          classNames: {
            title: "font-varela text-left",
          },
          radius: "lg",
          color: "success",
          timeout: 6000,
        });
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [submitted]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted(data);
  };

  return (
    <div className="container mx-auto px-5 h-screen w-full dark">
      <div className="py-20">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-textColor1 text-4xl md:text-5xl font-bold text-center w-full">
            Add Photos
          </h1>
        </div>
        <div className="mt-10 rounded-xl border-textColor1 border-2 py-16 px-10 flex flex-col items-center justify-center gap-14 overflow-x-hidden w-full">
          <Form
            className="w-full flex flex-col items-center justify-center gap-14"
            validationBehavior="native"
            onReset={() => {
              setSubmitted(null);
            }}
            onSubmit={onSubmit}
          >
            <div className="w-full flex flex-row flex-wrap-reverse items-center justify-between gap-10">
              <div className="flex w-full flex-col gap-10 items-center justify-center">
                <Select
                  label="Choose Event"
                  variant="bordered"
                  color="warning"
                  name="eventId"
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
                  {events.map((item) => (
                    <SelectItem
                      key={item._id}
                      variant="faded"
                      color="warning"
                      classNames={{ title: "text-md" }}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="Upload Images of the Event"
                  isRequired
                  name="images"
                  variant="flat"
                  size="lg"
                  labelPlacement="outside"
                  isClearable
                  color="warning"
                  classNames={{
                    label: "text-md",
                    description: "text-left text-[13px]",
                    errorMessage: "text-left text-[13px]",
                  }}
                  startContent={
                    <FaCamera className="text-lg text-textColor1" />
                  }
                  type="file"
                  multiple={true}
                  accept="image/*"
                ></Input>
              </div>
            </div>

            <div className="flex w-full items-center justify-center flex-wrap flex-row gap-8">
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
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddPhotos;
