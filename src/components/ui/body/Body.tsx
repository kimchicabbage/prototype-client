import { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../card";
import { Map } from "../map";
import { MapMarkerProps } from "../map/MapMarker";

interface BodyStates {
  server: string;
  points: BuildMarKerPropsParams[];
}

interface GetPointsApiResponse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface BuildMarKerPropsParams {
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
}

interface BodyProps {}

const defaultServerUrl = "http://10.48.17.190:10000";

export default class Body extends Component<BodyProps> {
  state: BodyStates = {
    server: defaultServerUrl,
    points: [],
  };

  setServerUrl(url: string): void {
    this.setState({ server: url });
  }

  setPoints(response: GetPointsApiResponse[]) {
    const points: BuildMarKerPropsParams[] = response.map(
      ({ latitude, longitude, name }) => ({
        latitude,
        longitude,
        title: name,
      })
    );
    this.setState({ points });
  }

  async fetchPoints() {
    try {
      const getPointsUrl = this.state.server + "/points";
      const response = await fetch(getPointsUrl);
      const points: GetPointsApiResponse[] = await response.json();
      this.setPoints(points);
    } catch (error) {
      console.error(error);
    }
  }

  buildMarkerProps(params: BuildMarKerPropsParams): MapMarkerProps {
    console.info(params);
    const { latitude, longitude, title, description } = params;
    const contents = (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description ?? `${title}입니다.`}</CardDescription>
        </CardHeader>
        <CardContent>
          <button>Stamp!!</button>
        </CardContent>
      </Card>
    );
    return {
      position: [latitude, longitude],
      title,
      description,
      contents,
    };
  }

  render() {
    const markers = this.state.points.map(
      ({ latitude, longitude, title }, index) =>
        this.buildMarkerProps({
          latitude,
          longitude,
          title,
        })
    );

    return (
      <div className="body">
        <Map markers={markers} />
        <Card>
          <CardHeader>
            <CardTitle>서버 연결</CardTitle>
          </CardHeader>
          <CardContent>
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
            <br />
            <br />
            <button
              onClick={() => {
                this.fetchPoints();
              }}
            >
              Point 불러오기
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location Fetching</CardTitle>
            <CardDescription>
              Click the button to fetch your location via Geo API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button>Fetch my location</button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manual Location Editing</CardTitle>
            <CardDescription>
              Enter your location coordinates below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <label htmlFor="latitude">Latitude</label>
            <input id="latitude" placeholder="Latitude" />
            <br />
            <label htmlFor="longitude">Longitude</label>
            <input id="longitude" placeholder="Longitude" />
            <br />
            <label htmlFor="altitude">Altitude</label>
            <input id="altitude" placeholder="Altitude" />
            <br />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Map Display</CardTitle>
            <CardDescription>
              Select your location by clicking on the map.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
}
//       <Card className="w-full max-w-2xl">
//         <CardHeader>
//           <CardTitle>Location Stamp Records</CardTitle>
//           <CardDescription>Your location stamp issuance records.</CardDescription>
//         </CardHeader>
//         <CardContent className="p-0">
//           <table>
//             <tableHeader>
//               <tableRow>
//                 <tableHead className="w-[100px]">Date</tableHead>
//                 <tableHead>Latitude</tableHead>
//                 <tableHead>Longitude</tableHead>
//                 <tableHead className="w-[100px]">Action</tableHead>
//               </tableRow>
//             </tableHeader>
//             <tableBody>
//               <tableRow>
//                 <tableCell className="font-medium">2023-08-01</tableCell>
//                 <tableCell>51.5074</tableCell>
//                 <tableCell>-0.1278</tableCell>
//                 <tableCell className="text-right">View</tableCell>
//               </tableRow>
//               <tableRow>
//                 <tableCell className="font-medium">2023-08-02</tableCell>
//                 <tableCell>40.7128</tableCell>
//                 <tableCell>-74.0060</tableCell>
//                 <tableCell className="text-right">View</tableCell>
//               </tableRow>
//               <tableRow>
//                 <tableCell className="font-medium">2023-08-03</tableCell>
//                 <tableCell>34.0522</tableCell>
//                 <tableCell>-118.2437</tableCell>
//                 <tableCell className="text-right">View</tableCell>
//               </tableRow>
//               <tableRow>
//                 <tableCell className="font-medium">2023-08-04</tableCell>
//                 <tableCell>41.8781</tableCell>
//                 <tableCell>-87.6298</tableCell>
//                 <tableCell className="text-right">View</tableCell>
//               </tableRow>
//               <tableRow>
//                 <tableCell className="font-medium">2023-08-05</tableCell>
//                 <tableCell>37.7749</tableCell>
//                 <tableCell>-122.4194</tableCell>
//                 <tableCell className="text-right">View</tableCell>
//               </tableRow>
//             </tableBody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
