import HongKongModify from "@/components/Hongkong/HongKongModify";
type DetailProps = {
  params: Promise<{
    id?: string | string[];
  }>;
};

const Detail = async ({ params }: DetailProps) => {
  const resolvedParams = await params;

  const id = Array.isArray(resolvedParams.id)
    ? resolvedParams.id[0]
    : resolvedParams.id || "default-id";

  return (
    <div>
      <HongKongModify id={id} />
    </div>
  );
};

export default Detail;
