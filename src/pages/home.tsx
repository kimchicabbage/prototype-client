import {
  getMembersApi,
  GetMembersApiResponse,
  getPointsApi,
  postStampApi,
  PostStampApiRequest,
} from "../api/stampApi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Component,
  Map,
} from "../components";
import { MapMarkerProps } from "../components/ui/map/MapMarker";
import { Location, Point } from "../types";

const defaultServerUrl = "http://10.48.17.190:10000";
const defaultLocation = {
  latitude: 37.526896,
  longitude: 126.9274189,
};

interface HomeStates {
  server: string;
  points: Point[];
  currentLocation: Location;
  zoom: number;
  memberId: number;
  memberInfo?: GetMembersApiResponse;
}

export default class Home extends Component {
  state: HomeStates = {
    server: defaultServerUrl,
    currentLocation: defaultLocation,
    points: [],
    zoom: 20,
    memberId: 1,
  };

  setServerUrl(server: string): void {
    this.setState({ server });
  }

  setPoints(points: Point[]) {
    this.setState({ points });
  }

  setCurrentLocation(currentLocation: Location) {
    this.setState({ currentLocation });
  }

  async fetchPoints() {
    const response = await getPointsApi(this.state.server);
    if (!response) {
      return;
    }
    const points = response.map(({ id, name, latitude, longitude }) => ({
      id,
      name,
      location: { latitude, longitude },
    }));
    this.setPoints(points);
  }

  async issueStamp(pointId: number, memberId: number) {
    const requestBody: PostStampApiRequest = {
      member: { id: memberId },
      point: { id: pointId },
      location: this.state.currentLocation,
    };
    await postStampApi(this.state.server, requestBody);
  }

  async fetchMember(id: number) {
    const response = await getMembersApi(
      this.state.server,
      this.state.memberId
    );
    if (!response) {
      return;
    }
    this.setState({ memberInfo: response });
  }

  findMe() {
    if (!navigator.geolocation) {
      console.error("브라우저가 위치 정보를 지원하지 않음");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      console.info("getCurrentPosition", position);
      const {
        coords: { latitude, longitude },
      } = position;
      this.setCurrentLocation({ latitude, longitude });
    }, console.error);
  }

  buildMarker = (point: Point): MapMarkerProps => {
    const {
      id,
      name,
      location: { longitude, latitude },
    } = point;
    const title = `${id}: ${name}`;
    const description = `${name}입니다.`;

    const contents = (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <button
            onClick={async () => {
              await this.issueStamp(id, this.state.memberId);
            }}
          >
            Stamp!
          </button>
        </CardContent>
      </Card>
    );
    return {
      position: [latitude, longitude],
      title,
      description,
      contents,
    };
  };

  renderJson(object: Object, depth: number = 0) {
    return Object.entries(object).map(([key, value]) => (
      <div key={this.generateKey()} style={{ marginLeft: `${depth * 4}px` }}>
        {typeof value === "object" ? (
          <>
            {Array.isArray(value) ? "[" : "{"}
            {this.renderJson(value, depth + 1)}
            {Array.isArray(value) ? "]" : "}"}
          </>
        ) : (
          `${key}: ${value}`
        )}
      </div>
    ));
  }

  render() {
    const center: [number, number] = [
      this.state.currentLocation.latitude,
      this.state.currentLocation.longitude,
    ];
    const markers = [
      ...this.state.points.map(this.buildMarker),
      { position: center, title: "현재 위치" },
    ];
    const zoom = this.state.zoom;

    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        <Map markers={markers} center={center} zoom={zoom} />
        <Card>
          <CardHeader>
            <CardTitle>서버 연결</CardTitle>
          </CardHeader>
          <CardContent>
            서버 주소를 입력하세요
            <br />
            <input
              placeholder="Enter URL"
              type="url"
              onChange={(event) => {
                this.setServerUrl(event.target.value);
              }}
              value={this.state.server}
            />
            <button
              onClick={(_) => {
                this.setServerUrl(defaultServerUrl);
              }}
            >
              reset
            </button>
            <button
              onClick={() => {
                this.fetchPoints();
              }}
            >
              Fetch Points
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>현재 위치</CardTitle>
          </CardHeader>
          <CardHeader></CardHeader>
          <CardContent>
            <p>
              Geo API로 현재 위치를 불러옵니다
              <br />
              <button
                onClick={() => {
                  this.findMe();
                }}
              >
                Find My Location
              </button>
            </p>
            <p>
              아래 값을 수정하여 위치를 조정할 수 있습니다
              <br />
              <input
                placeholder="Latitude"
                type="number"
                step={0.0001}
                onChange={(event) => {
                  this.setCurrentLocation({
                    latitude: Number(event.target.value),
                    longitude: this.state.currentLocation.longitude,
                  });
                }}
                value={this.state.currentLocation.latitude}
              />
              <button
                onClick={(_) => {
                  this.setCurrentLocation({
                    latitude: defaultLocation.latitude,
                    longitude: this.state.currentLocation.longitude,
                  });
                }}
              >
                reset
              </button>
              {", "}
              <input
                placeholder="Longitude"
                type="number"
                step={0.0001}
                onChange={(event) => {
                  this.setCurrentLocation({
                    latitude: this.state.currentLocation.latitude,
                    longitude: Number(event.target.value),
                  });
                }}
                value={this.state.currentLocation.longitude}
              />
              <button
                onClick={(_) => {
                  this.setCurrentLocation({
                    latitude: this.state.currentLocation.latitude,
                    longitude: defaultLocation.longitude,
                  });
                }}
              >
                reset
              </button>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>스탬프</CardTitle>
            <CardDescription>스템프를 조회합니다</CardDescription>
          </CardHeader>
          <CardContent>
            Member Id:
            <input
              placeholder="1"
              type="number"
              onChange={(event) => {
                this.setState({ memberId: Number(event.target.value) });
              }}
              value={this.state.memberId}
            />
            <button
              onClick={() => {
                this.fetchMember(this.state.memberId);
              }}
            >
              Fetch Member
            </button>
            <br />
            {this.state.memberInfo && this.renderJson(this.state.memberInfo)}
          </CardContent>
        </Card>
      </div>
    );
  }
}
