import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export const CustomerReviewSlider = () => {
  return (
    <div className="flex h-[50%] justify-center bg-[#030406]">
      <div className="w-[65%]">
        <Slider
          initialSlide={0}
          slidesToShow={3}
          slidesToScroll={1}
          speed={100}
          cssEase="linear"
          arrows={false}
          dots={true}
          swipeToSlide={true}
        >
          <div>
            <Image src="/customer_review_card.png" alt="React Picture" width={300} height={300} />
          </div>
          <div>
            <Image src="/customer_review_card.png" alt="React Picture" width={300} height={300} />
          </div>
          <div>
            <Image src="/customer_review_card.png" alt="React Picture" width={300} height={300} />
          </div>
          <div>
            <Image src="/customer_review_card.png" alt="React Picture" width={300} height={300} />
          </div>
          <div>
            <Image src="/customer_review_card.png" alt="React Picture" width={300} height={300} />
          </div>
          <div>
            <Image src="/customer_review_card.png" alt="React Picture" width={300} height={300} />
          </div>
        </Slider>
      </div>
    </div>
  );
};
