import InfoCard from "./InfoCard";

type InfoItem = {
  image: string;
  title: string;
  description: string;
  href: string;
};

type InfoCardListProps = {
  items: InfoItem[];
};

const InfoCardList: React.FC<InfoCardListProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {items.map((item, index) => (
        <InfoCard
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
          href={item.href}
        />
      ))}
    </div>
  );
};

export default InfoCardList;
