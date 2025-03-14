import mergeDeep from './util/merge-deep.js';

const cityCenterCoords = [-75.163471, 39.953338];

const addressDoubles = [
  '15 E HAMPTON RD',
];

const imageryInfo = {
  sources: {
    imageryParcelOutlines: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/PWDParcel_ImageryOverlay/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    imageryLabels: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2023: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2023/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2022: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2022_2in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2020: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2020_3in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2019: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2019_3in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2018: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2018_3in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2017: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2017_3in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2016: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2016_3in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2015: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2015_3in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2012: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2012_3in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2010: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2010_3in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2008: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2008_3in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    2004: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2004_6in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    1996: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_1996_6in/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    cyclomediaRecordings: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      },
    },
    cyclomediaCamera: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [],
        }
      }
    },
    cyclomediaViewcone: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[[]]],
        }
      }
    },
  },
}

const pwdDrawnMapStyle = mergeDeep(imageryInfo,{
  version: 8,
  name: 'pwdDrawnMap',
  glyphs: '//fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  sources: {
    pwd: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    pwdLabels: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    addressMarker: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [],
        }
      }
    },
    pwdParcel: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[[]]],
        }
      }
    },
  },
  layers: [
    {
      id: 'pwd',
      source: 'pwd',
      type: 'raster',
    },
    {
      id: 'pwdLabels',
      source: 'pwdLabels',
      type: 'raster',
    },
    {
      id: 'cyclomediaRecordings',
      source: 'cyclomediaRecordings',
      type: 'circle',
      paint: {
        'circle-radius': 6,
        'circle-color': '#5b94c6',
        'circle-stroke-width': 1,
        'circle-stroke-color': '#a1a1a1',
        'circle-opacity': 0.5,
      }
    },
    {
      id: 'cyclomediaCamera',
      source: 'cyclomediaCamera',
      type: 'symbol',
      layout: {
        'icon-image': 'camera-icon',
        'icon-anchor' : 'center',
        'icon-size': 0.09,
        'icon-rotate': 0,
        'icon-rotation-alignment': 'map',
        "icon-allow-overlap" : true,
        "text-allow-overlap": true,
      },
    },
    {
      'id': 'cyclomediaViewcone',
      'type': 'fill',
      'source': 'cyclomediaViewcone',
      'layout': {},
      'paint': {
        'fill-color': 'rgb(0,102,255)',
        'fill-opacity': 0.2,
      },
    },
    {
      id: 'pwdParcel',
      type: 'fill',
      source: 'pwdParcel',
      layout: {},
      paint: {
        'fill-color': 'blue',
        'fill-opacity': 0.4
      }
    },
    {
      id: 'pwdParcelLine',
      type: 'line',
      source: 'pwdParcel',
      layout: {},
      paint: {
        'line-color': 'blue',
        'line-width': 2
      }
    },
    {
      id: 'addressMarker',
      source: 'addressMarker',
      type: 'symbol',
      layout: {
        'icon-image': 'marker-blue',
        // 'icon-image': 'camera-icon',
        'icon-rotate': 0,
        'icon-anchor': 'bottom',
        'icon-size': .05,
        "icon-allow-overlap" : true,
        "text-allow-overlap": true,
      },
    },
  ],
});

const dorDrawnMapStyle = mergeDeep(imageryInfo,{
  version: 8,
  name: 'dorDrawnMap',
  glyphs: '//fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  sources: {
    dor: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/DORBasemap/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    dorLabels: {
      tiles: [
        'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/DORBasemap_Labels/MapServer/tile/{z}/{y}/{x}',
      ],
      type: 'raster',
      tileSize: 256,
    },
    addressMarker: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [],
        }
      }
    },
    dorParcel: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[[]]],
        }
      }
    },
  },
  layers: [
    {
      id: 'dor',
      source: 'dor',
      type: 'raster',
    },
    {
      id: 'dorLabels',
      source: 'dorLabels',
      type: 'raster',
    },
    {
      id: 'cyclomediaRecordings',
      source: 'cyclomediaRecordings',
      type: 'circle',
      paint: {
        'circle-radius': 6,
        'circle-color': '#5b94c6',
        'circle-stroke-width': 1,
        'circle-stroke-color': '#a1a1a1',
        'circle-opacity': 0.5,
      }
    },
    {
      id: 'cyclomediaCamera',
      source: 'cyclomediaCamera',
      type: 'symbol',
      layout: {
        'icon-image': 'camera-icon',
        'icon-anchor' : 'center',
        'icon-size': 0.09,
        'icon-rotate': 0,
        'icon-rotation-alignment': 'map',
        "icon-allow-overlap" : true,
        "text-allow-overlap": true,
      },
    },
    {
      'id': 'cyclomediaViewcone',
      'type': 'fill',
      'source': 'cyclomediaViewcone',
      'layout': {},
      'paint': {
        'fill-color': 'rgb(0,102,255)',
        'fill-opacity': 0.2,
      },
    },
    {
      id: 'dorParcel',
      type: 'fill',
      source: 'dorParcel',
      layout: {},
      paint: {
        'fill-color': 'blue',
        'fill-opacity': 0.4
      }
    },
    {
      id: 'dorParcelLine',
      type: 'line',
      source: 'dorParcel',
      layout: {},
      paint: {
        'line-color': 'blue',
        'line-width': 2
      }
    },
  ],
});

const $config = {
  topicStyles: {
    property: 'pwdDrawnMapStyle',
    condos: 'pwdDrawnMapStyle',
    deeds: 'dorDrawnMapStyle',
    li: 'liDrawnMapStyle',
    zoning: 'zoningDrawnMapStyle',
    voting: 'votingDrawnMapStyle',
    city311: 'nearbyDrawnMapStyle',
    stormwater: 'stormwaterDrawnMapStyle',
    nearby: 'nearbyDrawnMapStyle',
    districts: 'pwdDrawnMapStyle',
  },
  parcelLayerForTopic: {
    undefined: 'pwd',
    // property: 'pwd',
    // condos: 'pwd',
    // deeds: 'dor',
    // li: 'pwd',
    // zoning: 'dor',
    // voting: 'pwd',
    // city311: 'pwd',
    // stormwater: 'pwd',
    // nearby: 'pwd',
    // districts: 'pwd',
  },
  mapLayers: {
    pwdBasemap: {
      id: 'pwdBasemap',
      source: 'pwdBasemap',
      type: 'raster',
    },
    pwdLabels: {
      id: 'pwdLabels',
      source: 'pwdLabels',
      type: 'raster',
    },
    dorBasemap: {
      id: 'dorBasemap',
      source: 'dorBasemap',
      type: 'raster',
    },
    dorLabels: {
      id: 'dorLabels',
      source: 'dorLabels',
      type: 'raster',
    },
    zoning: {
      id: 'zoning',
      source: 'zoning',
      type: 'raster',
    },
    // addressMarker: {
    //   id: 'addressMarker',
    //   source: 'addressMarker',
    //   type: 'circle',
    // },
    pwdParcel: {
      id: 'pwdParcel',
      type: 'fill',
      source: 'pwdParcel',
      layout: {},
      paint: {
        'fill-color': 'blue',
        'fill-opacity': 0.4
      }
    },
    pwdParcelLine: {
      id: 'pwdParcelLine',
      type: 'line',
      source: 'pwdParcel',
      layout: {},
      paint: {
        'line-color': 'blue',
        'line-width': 2
      }
    },
    imageryParcelOutlines: {
      id: 'imageryParcelOutlines',
      source: 'imageryParcelOutlines',
      type: 'raster',
      minzoom: 0,
      maxzoom: 22,
    },
    imageryLabels: {
      id: 'imageryLabels',
      source: 'imageryLabels',
      type: 'raster',
    },
    2023: {
      id: '2023',
      source: '2023',
      type: 'raster',
    },
    2022: {
      id: '2022',
      source: '2022',
      type: 'raster',
    },
    2020: {
      id: '2020',
      source: '2020',
      type: 'raster',
    },
    2019: {
      id: '2019',
      source: '2019',
      type: 'raster',
    },
    2018: {
      id: '2018',
      source: '2018',
      type: 'raster',
    },
    2017: {
      id: '2017',
      source: '2017',
      type: 'raster',
    },
    2016: {
      id: '2016',
      source: '2016',
      type: 'raster',
    },
    2015: {
      id: '2015',
      source: '2015',
      type: 'raster',
    },
    2012: {
      id: '2012',
      source: '2012',
      type: 'raster',
    },
    2010: {
      id: '2010',
      source: '2010',
      type: 'raster',
    },
    2008: {
      id: '2008',
      source: '2008',
      type: 'raster',
    },
    2004: {
      id: '2004',
      source: '2004',
      type: 'raster',
    },
    1996: {
      id: '1996',
      source: '1996',
      type: 'raster',
    },
  },
}

const dorLegendData = {
  'Easements': {
    'border-color': 'rgb(255, 0, 197)',
    'border-style': 'solid',
    'border-weight': '1px',
    'width': '12px',
    'height': '12px',
    'font-size': '10px',
  },
  'Trans Parcels': {
    'border-color': 'rgb(0, 168, 132)',
    'border-style': 'solid',
    'border-weight': '1px',
    'width': '12px',
    'height': '12px',
    'font-size': '10px',
  },
  'Rights of Way': {
    'border-color': 'rgb(249, 147, 0)',
    'border-style': 'solid',
    'border-weight': '1px',
    'width': '12px',
    'height': '12px',
    'font-size': '10px',
  },
};

$config['cityCenterCoords'] = cityCenterCoords;
$config['addressDoubles'] = addressDoubles;
$config['pwdDrawnMapStyle'] = pwdDrawnMapStyle;
$config['dorDrawnMapStyle'] = dorDrawnMapStyle;
// $config['liDrawnMapStyle'] = liDrawnMapStyle;
// $config['zoningDrawnMapStyle'] = zoningDrawnMapStyle;
// $config['votingDrawnMapStyle'] = votingDrawnMapStyle;
// $config['stormwaterDrawnMapStyle'] = stormwaterDrawnMapStyle;
// $config['nearbyDrawnMapStyle'] = nearbyDrawnMapStyle;
// $config['ZONING_CODE_MAP'] = ZONING_CODE_MAP;
$config['dorLegendData'] = dorLegendData;
// $config['stormwaterLegendData'] = stormwaterLegendData;

export default $config;