import HongKongModify from "@/components/Hongkong/HongKongModify";

type DetailProps = {
  params: {
    id: string;
  };
};

const Detail = async ({ params }: DetailProps) => {
  const { id } = await params;
  return (
    <div>
      <HongKongModify id={id[0]} />
    </div>
  );
};

export default Detail;
