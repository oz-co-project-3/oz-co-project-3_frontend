'use client';

import useMapStore from '@/store/MapStore';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';

export default function Map({
  address,
  children,
}: {
  address: string;
  children?: React.ReactNode;
}) {
  const mapRef = useRef<naver.maps.Map>(null);
  const { location, setLocation } = useMapStore();

  const createMap = () => {
    const map: naver.maps.Map = new naver.maps.Map('map', {
      zoom: 16,
    });
    mapRef.current = map;

    map.setOptions({
      position: naver.maps.Position.TOP_RIGHT,
      minZoom: 12,
      maxZoom: 20,
    });

    naver.maps.Event.once(mapRef.current, 'init', function () {
      naver.maps.Service.geocode(
        {
          query: address,
        },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            return console.log('주소 -> 좌표 변환 오류');
          }

          const result = response.v2;
          const coordinates = result.addresses[0];
          // console.log(coordinates);
          const targetLocation = new naver.maps.Point(Number(coordinates.x), Number(coordinates.y));
          map.setCenter(targetLocation);
          setLocation(targetLocation);
        },
      );
    });
  };

  useEffect(() => {
    if (location && mapRef.current) {
      new naver.maps.Marker({
        position: location,
        map: mapRef.current,
      });
    }
  }, [location]);

  return (
    <>
      <Script
        type='text/javascript'
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`}
        onReady={createMap}
        strategy='afterInteractive'
        // async
      />
      <div id='map' className='relative h-80 w-full rounded-md'>
        {location && (
          <Button
            onClick={() => mapRef.current?.setCenter(location)}
            className='bg-main-light hover:bg-main-dark absolute bottom-4 left-4 z-10 cursor-pointer'
          >
            <MapPin className='size-4' />
          </Button>
        )}
        {children}
      </div>
    </>
  );
}
