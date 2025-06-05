import { Link } from "react-router-dom";

type InfoCardProps = {
  image: string;
  title: string;
  description: string;
  href: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ image, title, description, href }) => {
  return (
    <Link
      to={href}
      className="group block text-center transition-all duration-300 hover:shadow-lg rounded-lg p-3 bg-white"
    >
      <div className="w-full h-48 flex items-center justify-center rounded-md overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover h-full max-h-full rounded-sm"
        />
      </div>
      <h3 className="mt-4 text-md font-semibold group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </Link>
  );
};

export default InfoCard;
