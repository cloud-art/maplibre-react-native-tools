import type { MapControlLineHandle } from '@/features/map';
import type {
  CircleGeometryLayer,
  Feature,
  FeatureCollection,
  GeometryToolHandle,
  GeometryType,
  LineString,
  Point,
  VisibleRegion,
} from '@/features/map/types';
import type { ForwardRefRenderFunction } from 'react';

import {
  Box,
  Button,
  Column,
  Heading,
  Icon,
  Row,
  Switch,
  Text,
} from 'native-base';
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  CircleLayer,
  MapControlLine,
  MapControlTarget,
  MapExtendControls,
  MapExtendFeatures,
  useMapStore,
} from '@/features/map';

import { mapEventBus } from '../../utils';

export type FeatureGeometryEditProps = {
  geometryType: GeometryType;
  feature?: Feature;
  canEdit?: boolean;
  snapSource?: FeatureCollection;
};

const PointEditRender: ForwardRefRenderFunction<
  GeometryToolHandle,
  Omit<FeatureGeometryEditProps, 'geometryType'>
> = ({ feature, canEdit = true }, ref) => {
  const setListenEvents = useMapStore(state => state.setListenEvents);

  const mapControlTargetRef = useRef<GeometryToolHandle>(null);

  const [isTargetMode, setIsTargetMode] = useState(true);
  const [point, setPoint] = useState<Feature<Point>>();

  const pointCollection = useMemo<
    Omit<CircleGeometryLayer, 'type'> | undefined
  >(
    () =>
      point && {
        name: 'POINT_PREVIEW',
        collection: { type: 'FeatureCollection', features: [point] },
        visible: true,
      },
    [point],
  );

  useEffect(() => {
    setListenEvents(false);

    let unsubscribe: (() => void) | undefined;

    if (!isTargetMode) unsubscribe = mapEventBus.subscribe('onPress', setPoint);

    return () => {
      unsubscribe && unsubscribe();
      setListenEvents(true);
    };
  }, [isTargetMode]);

  useImperativeHandle(
    ref,
    () => ({
      getValue: isTargetMode
        ? async () => await mapControlTargetRef.current?.getValue()
        : () => point,
    }),
    [point, isTargetMode],
  );

  return (
    <>
      <Column>
        <Heading fontWeight="700" size="lg">
          Выберите новое место
        </Heading>
        <Row justifyContent="space-between" mt="4">
          <Text>Альтернативный режим</Text>
          <Switch
            isChecked={isTargetMode}
            isDisabled={!canEdit}
            onToggle={() => {
              setPoint(undefined);
              setIsTargetMode(v => !v);
            }}
          />
        </Row>
        <Text color="secondary.400">
          {isTargetMode ? 'Двигайте карту' : 'Нажмите на карту'}, чтобы указать
          место.
        </Text>
      </Column>
      {isTargetMode ? (
        <MapControlTarget
          ref={mapControlTargetRef}
          feature={feature as Feature<Point>}
        />
      ) : (
        pointCollection && (
          <MapExtendFeatures>
            <CircleLayer layer={pointCollection} style={styles.points} />
          </MapExtendFeatures>
        )
      )}
    </>
  );
};

const PointEdit = memo(forwardRef(PointEditRender));

const LineEditRender: ForwardRefRenderFunction<
  GeometryToolHandle,
  Omit<FeatureGeometryEditProps, 'geometryType'>
> = ({ feature, snapSource, canEdit = true }, ref) => {
  const controlRef = useRef<MapControlLineHandle>(null);

  const [isTargetMode, setIsTargetMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const addPoint = async () => {
    if (!controlRef.current?.addPoint) return;
    try {
      setIsLoading(true);
      await controlRef.current.addPoint();
    } finally {
      setIsLoading(false);
    }
  };
  const popPoint = () => {
    return controlRef.current?.popPoint();
  };
  const toggleMode = () => {
    setIsTargetMode(value => !value);
  };

  useImperativeHandle(
    ref,
    () => ({
      getValue: () => {
        return controlRef.current?.getValue();
      },
    }),
    [],
  );

  return (
    <>
      <Column>
        <Heading fontWeight="700" size="lg">
          Проведите путь
        </Heading>
        {isTargetMode ? (
          <>
            <Text color="secondary.400">
              Двигайте карту, чтобы выбрать место.
            </Text>
            <Text color="secondary.400">
              Нажмите на кнопку “+”, чтобы добавить точку.
            </Text>
          </>
        ) : (
          <Text color="secondary.400">
            Ставьте точки, путем нажатия на карту.
          </Text>
        )}
        <Column mt="8" space="5">
          <Row justifyContent="space-between">
            <Text>Альтернативный режим</Text>
            <Switch
              isChecked={isTargetMode}
              isDisabled={!canEdit}
              onToggle={toggleMode}
            />
          </Row>
          <Row space="4">
            <Button
              flexGrow={1}
              isDisabled={!canEdit}
              variant="secondary"
              leftIcon={<Icon as={MaterialIcons} name="cancel" />}
              onPress={popPoint}
            >
              Убрать точку
            </Button>
            <Button
              flexGrow={1}
              isDisabled={!isTargetMode || !canEdit}
              isLoading={isLoading}
              leftIcon={<Icon as={MaterialIcons} name="add" />}
              onPress={addPoint}
            >
              Поставить точку
            </Button>
          </Row>
        </Column>
      </Column>

      {canEdit && (
        <MapControlLine
          ref={controlRef}
          feature={feature as Feature<LineString>}
          isTargetMode={isTargetMode}
          snapSource={snapSource}
        />
      )}
    </>
  );
};
const LineEdit = memo(forwardRef(LineEditRender));

export const FeatureGeometryEditRender: ForwardRefRenderFunction<
  GeometryToolHandle,
  FeatureGeometryEditProps
> = ({ geometryType, ...props }, ref) => {
  const [canEdit, setCanEdit] = useState(true);

  const handleRegionDidChange = useCallback(
    ({ properties: { zoomLevel } }: VisibleRegion) => {
      setCanEdit(zoomLevel > 17);
    },
    [],
  );
  useEffect(() => {
    const unsubscribe = mapEventBus.subscribe(
      'onRegionDidChange',
      handleRegionDidChange,
    );
    return () => {
      unsubscribe();
    };
  }, [handleRegionDidChange]);
  //#region Render
  let editor;
  if (geometryType === 'Point')
    editor = <PointEdit ref={ref} canEdit={canEdit} {...props} />;
  if (geometryType === 'LineString')
    editor = <LineEdit ref={ref} canEdit={canEdit} {...props} />;

  return (
    <>
      {editor}
      {!canEdit && (
        <MapExtendControls>
          <Box
            bg="black:alpha.50"
            maxW="70%"
            mx="auto"
            p="4"
            rounded="lg"
            top="45%"
          >
            <Text color="primary.100" size="md" textAlign="center">
              Для редактирования увеличьте масштаб карты
            </Text>
          </Box>
        </MapExtendControls>
      )}
    </>
  );
  //#endregion
};

export const FeatureGeometryEdit = memo(forwardRef(FeatureGeometryEditRender));

const styles = {
  points: {
    circle: {
      circleColor: '#000',
      circleRadius: 5,
      circleStrokeWidth: 3,
      circleStrokeColor: '#fff',
    },
  },
};
