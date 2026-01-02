import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BannerSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <div className="relative h-64 rounded-xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop"
              alt="Electronics Sale"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8">
              <div className="text-white">
                <p className="text-sm font-medium mb-1">NEW ARRIVALS</p>
                <h3 className="text-3xl font-bold mb-2">Electronics Store</h3>
                <p className="text-white/80 mb-4">Get the latest gadgets</p>
                <Button asChild variant="secondary">
                  <Link to="/category/electronics">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative h-64 rounded-xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop"
              alt="Fashion Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8">
              <div className="text-white">
                <p className="text-sm font-medium mb-1">TRENDING NOW</p>
                <h3 className="text-3xl font-bold mb-2">Fashion Week</h3>
                <p className="text-white/80 mb-4">Up to 40% off selected items</p>
                <Button asChild variant="secondary">
                  <Link to="/category/fashion">Explore</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
