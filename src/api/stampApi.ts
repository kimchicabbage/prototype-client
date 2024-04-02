export interface PointRecord {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export async function getPointsApi(
  server: string
): Promise<PointRecord[] | undefined> {
  try {
    const getPointsApiPath = server + "/points";
    const response = await fetch(getPointsApiPath);
    const points: PointRecord[] = await response.json();
    console.info("GET /points response", points);
    return points;
  } catch (error) {
    console.error(error);
  }
}

export interface PostStampApiRequest {
  member: {
    id: number;
  };
  point: {
    id: number;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}

export async function postStampApi(
  server: string,
  body: PostStampApiRequest
): Promise<void> {
  const {
    member: { id: memberId },
    point: { id: pointId },
    location: { latitude, longitude },
  } = body;
  try {
    const postStampApiPath = server + "/stamp";
    const response = await fetch(postStampApiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId,
        pointId,
        latitude,
        longitude,
      }),
    });
    if (!response.ok) {
      throw new Error("request failed");
    }
    const message = await response.json();
    console.info("POST /stamp response", message);
  } catch (error) {
    console.error(error);
  }
}

export interface PointStampRecord {
  createAt: Date;
  latitude: number;
  longitude: number;
  point: PointRecord;
}

export interface ChallengeRecord {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface ChallengeStamRecord {
  createAt: Date;
  challenge: ChallengeRecord;
}

export interface GetMembersApiResponse {
  id: number;
  name: string;
  pointStamps: PointStampRecord[];
  challengeStamps: PointStampRecord[];
}

export async function getMembersApi(
  server: string,
  id: number
): Promise<GetMembersApiResponse | undefined> {
  try {
    const getMemberssApiPath = server + `/members/${id}`;
    const response = await fetch(getMemberssApiPath);
    const member: GetMembersApiResponse = await response.json();
    console.info("GET /members response", member);
    return member;
  } catch (error) {
    console.error(error);
  }
}
