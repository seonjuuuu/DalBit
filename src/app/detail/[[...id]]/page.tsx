import HongKongModify from "@/components/Hongkong/HongKongModify";

type DetailProps = {
  params: {
    id: string;
  };
};

const Detail = ({ params }: DetailProps) => {
  const { id } = params;
  return (
    <div>
      <HongKongModify id={id[0]} />
    </div>
  );
};

export default Detail;
