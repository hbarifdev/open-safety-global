import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProductSkeletonGrid from '../ui/ProductSkeletonGrid';
import TabNavigation from '../ui/TabNavigation';
import InfoCardList from '../layout/InfoCardList';
import ProductList from '../products/ProductList';

interface Tab {
  id: string;
  label: string;
}

export interface InfoItem {
  image: string;
  title: string;
  description: string;
  href: string;
}

interface DynamicTabGridProps {
  tabs: Tab[];
  productTabId?: string;
  productData?: any[];
  isProductLoading?: boolean;
  infoData?: Record<string, InfoItem[]>;
  gridClasses?: Record<string, string>;
  skeletonBreakpoints?: Record<string, number>;
}

const DynamicTabGrid: React.FC<DynamicTabGridProps> = ({
  tabs,
  productTabId = 'featured',
  productData = [],
  isProductLoading = false,
  infoData = {},
  gridClasses = {},
  skeletonBreakpoints = { base: 1, sm: 2, md: 3, lg: 4 },
}) => {
  const activeTab = useSelector((state: RootState) => state.ui.activeTab);

  return (
    <div className="py-4 sm:py-6 md:py-8">
      <div className="container mx-auto">
        <TabNavigation tabs={tabs} activeTab={activeTab} />

        <div className="mt-4 sm:mt-6 md:mt-8">
          {/* Product tab */}
          {activeTab === productTabId && (
            <>
              {isProductLoading && (
                <ProductSkeletonGrid
                  breakpoints={ skeletonBreakpoints}
                  className={gridClasses[productTabId] || 'md:grid-cols-3 lg:grid-cols-4'}
                />
              )}
              {!isProductLoading && (
                <ProductList
                  products={productData}
                  className={gridClasses[productTabId] || 'md:grid-cols-3 lg:grid-cols-4'}
                />
              )}
            </>
          )}

          {/* Info tabs */}
          {tabs.map(
            (tab) =>
              tab.id !== productTabId &&
              activeTab === tab.id &&
              infoData[tab.id] && (
                <InfoCardList
                  key={tab.id}
                  items={infoData[tab.id]}
                  className={gridClasses[tab.id] || 'sm:grid-cols-3 lg:grid-cols-4'}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicTabGrid;
