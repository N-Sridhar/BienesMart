import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useWindowSize} from 'react-use';
import '../styles/Home.scss';
import Carousel from 'react-material-ui-carousel';

import One from '../image/carousel/01.jpg';
import Two from '../image/carousel/02.jpg';
import Three from '../image/carousel/03.jpg';
import Four from '../image/carousel/04.jpg';

import Unisex from '../image/apperals/unisex.jpg';
import Mens from '../image/apperals/mens.jpg';
import Womens from '../image/apperals/womens.jpg';
import Kids from '../image/apperals/kids.jpg';

import MobileCase from '../image/accessories/mobilecase.jpg';
import PopGrip from '../image/accessories/popgrip.jpg';
import Mug from '../image/accessories/mug.jpg';
import SipperBottle from '../image/accessories/sipperbottle.jpg';
import ToteBag from '../image/accessories/totebag.jpg';
import Coaster from '../image/accessories/coaster.jpg';
import MousePad from '../image/accessories/mousepad.jpg';
import NotePad from '../image/accessories/notepad.jpg';

import Canvas from '../image/decors/canvas.jpg';
import PhotoFrame from '../image/decors/photoframe.jpg';
import Poster from '../image/decors/poster.jpg';
import DreamCatcher from '../image/decors/dreamcatcher.jpg';

import Box from '../image/homeInfo/box.svg';
import DeliveryTruck from '../image/homeInfo/delivery-truck.svg';
import India from '../image/homeInfo/india.svg';
import Package from '../image/homeInfo/package.svg';
import {accessoriesPath, apparelsPath, decorsPath} from './Exporter';

function Home() {
  useEffect(() => {
    document.title = 'Home • BienesMart📦';
    window.scrollTo(0, 0);
  }, []);

  const {width} = useWindowSize();

  const altText = '🔄 Please reload the site ❗';

  const banners = [
    {
      src: One,
    },
    {
      src: Two,
    },
    {
      src: Three,
    },
    {
      src: Four,
    },
  ];

  const apparels = [
    {
      path: apparelsPath['Unisex'],
      src: Unisex,
    },
    {
      path: apparelsPath['Mens'],
      src: Mens,
    },
    {
      path: apparelsPath['Womens'],
      src: Womens,
    },
    {
      path: apparelsPath['Kids'],
      src: Kids,
    },
  ];

  const infoSvgs = [
    {src: Box, label: 'Securely Packed'},
    {src: DeliveryTruck, label: 'Free Shipping'},
    {src: India, label: 'Home Grown Indian Products'},
    {src: Package, label: 'On-Time Delivery'},
  ];

  const accessories = [
    {
      path: accessoriesPath['MobileCases'],
      src: MobileCase,
    },
    {
      path: accessoriesPath['PopGrips'],
      src: PopGrip,
    },
    {
      path: accessoriesPath['Mugs'],
      src: Mug,
    },
    {
      path: accessoriesPath['Sippers'],
      src: SipperBottle,
    },
    {
      path: accessoriesPath['ToteBags'],
      src: ToteBag,
    },
    {
      path: accessoriesPath['Coasters'],
      src: Coaster,
    },
    {
      path: accessoriesPath['MousePads'],
      src: MousePad,
    },
    {
      path: accessoriesPath['NotePads'],
      src: NotePad,
    },
  ];

  const decors = [
    {
      path: decorsPath.Canvas,
      src: Canvas,
    },
    {
      path: decorsPath['PhotoFrames'],
      src: PhotoFrame,
    },
    {
      path: decorsPath['Posters'],
      src: Poster,
    },
    {
      path: decorsPath['DreamCatchers'],
      src: DreamCatcher,
    },
  ];

  return (
    <div className="home">
      <div className="home_container">
        <Carousel
          className="home_carousel"
          indicators={false}
          animation="slide"
          fullHeightHover={true}
        >
          {banners.map((banner, i) => (
            <img src={banner.src} alt={altText} key={i} />
          ))}
        </Carousel>
        <div className="home_categoryRow">
          <div
            className="home_categoryRow_Tilte"
            style={width > 769 ? {marginTop: '-16rem'} : {marginTop: '0'}}
          >
            <div className="home_Title_Line"></div>
            <span>Apparels</span>
            <div className="home_Title_Line"></div>
          </div>
          <div className="home_categoryCard_group">
            {apparels.map((apparel, i) => (
              <div className="home_apparelsCard" key={i}>
                <Link to={apparel.path}>
                  <img src={apparel.src} alt={altText} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="home_Info_Row">
          {infoSvgs.map((infoSvg, i) => (
            <div className="home_Info_svg" key={i}>
              <img src={infoSvg.src} alt={altText} />
              <span>{infoSvg.label}</span>
            </div>
          ))}
        </div>
        <div className="home_categoryRow">
          <div className="home_categoryRow_Tilte">
            <div className="home_Title_Line"></div>
            <span>Accessories</span>
            <div className="home_Title_Line"></div>
          </div>
          <div className="home_categoryCard_group" style={{flexWrap: 'wrap'}}>
            {accessories.map((accessory, i) => (
              <div className="home_accessoryCard" key={i}>
                <Link to={accessory.path}>
                  <img src={accessory.src} alt={altText} />
                </Link>
              </div>
              // </LazyLoad>
            ))}
          </div>
        </div>
        <div className="home_Info_Row">
          <div className="home_Info_Poster1">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/TVs/BAU/ABlaunch/ABTV_1242x450._CB412682518_SY500_.jpg"
              alt={altText}
            />
          </div>
        </div>
        <div className="home_categoryRow">
          <div className="home_categoryRow_Tilte">
            <div className="home_Title_Line"></div>
            <span>DECORS </span>
            <div className="home_Title_Line"></div>
          </div>
          <div className="home_categoryCard_group">
            {decors.map((decor, i) => (
              <div className="home_decorCard" key={i}>
                <Link to={decor.path}>
                  <img src={decor.src} alt={altText} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
