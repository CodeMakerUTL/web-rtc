import { Empty } from "keep-react";

export default function SelectUser() {
  return (
    <Empty
      title="Select User to Call"
      content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry."
      buttonText="Get All user"
      redirectBtnSize="md"
      redirectUrl="/"
      image={
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      }
    />
  );
}
