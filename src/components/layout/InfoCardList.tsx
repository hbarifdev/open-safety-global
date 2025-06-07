import InfoCard from "./InfoCard";

type InfoItem = {
  image: string;
  title: string;
  description: string;
  href: string;
};

type InfoCardListProps = {
  items: InfoItem[];
  className?: string;
};

const InfoCardList: React.FC<InfoCardListProps> = ({ items, className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }) => {
  return (
    <div className={`grid grid-cols-2 gap-6 ${className}`}>
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
