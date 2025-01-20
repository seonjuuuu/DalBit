import HongKongModify from "@/components/Hongkong/HongKongModify";

type DetailProps = {
  params: {
    id: string | string[];
  };
};

const Detail = async ({ params }: DetailProps) => {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <div>
      <HongKongModify id={id} />
    </div>
  );
};

export default Detail;
