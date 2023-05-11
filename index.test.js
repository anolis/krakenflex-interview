 
const fs = require('fs');
const axios = require('axios');
jest.mock('fs');
jest.mock('axios');

const outagesMock = {
  "data":[
  {
      "id": "00448f8a-a69d-4b91-af9a-71bc7395c5b0",
      "begin": "2021-05-01T15:04:49.536Z",
      "end": "2022-11-10T01:52:39.005Z"
  },
  {
      "id": "017ee1aa-a12f-4310-a29b-3429ef4226b7",
      "begin": "2021-12-13T18:41:46.426Z",
      "end": "2021-12-14T17:15:20.049Z"
  },
  {
      "id": "02001883-7fbe-4d85-8847-7f3c4a840fcf",
      "begin": "2021-11-27T03:58:04.541Z",
      "end": "2022-03-24T23:06:58.086Z"
  },
  {
      "id": "03befade-111e-4546-bfd4-396354da5503",
      "begin": "2021-04-21T18:00:08.492Z",
      "end": "2022-07-07T19:22:03.821Z"
  },
  {
      "id": "07a65800-82e5-4c75-b0ee-0e76202ff586",
      "begin": "2021-02-18T16:54:19.356Z",
      "end": "2022-02-17T00:06:11.313Z"
  },
  {
      "id": "082e6360-e95e-44db-86ad-12076cc32053",
      "begin": "2021-08-16T04:57:51.795Z",
      "end": "2021-12-20T22:53:34.873Z"
  },
  {
      "id": "0e4d59ba-43c7-4451-a8ac-ca628bcde417",
      "begin": "2022-02-15T11:28:26.735Z",
      "end": "2022-08-28T03:37:48.568Z"
  },
  {
      "id": "0e4d59ba-43c7-4451-a8ac-ca628bcde417",
      "begin": "2020-10-29T20:23:43.559Z",
      "end": "2023-05-29T00:59:55.313Z"
  },
  {
      "id": "0ed55c55-aac2-496c-ad4d-80be0d53b5d2",
      "begin": "2022-02-01T13:06:27.505Z",
      "end": "2022-02-02T09:24:40.748Z"
  },
  {
      "id": "111183e7-fb90-436b-9951-63392b36bdd2",
      "begin": "2022-01-01T00:00:00.000Z",
      "end": "2022-09-15T19:45:10.341Z"
  },
  {
      "id": "111183e7-fb90-436b-9951-63392b36bdd2",
      "begin": "2022-02-18T01:01:20.142Z",
      "end": "2022-08-15T14:34:50.366Z"
  },
  {
      "id": "111183e7-fb90-436b-9951-63392b36bdd2",
      "begin": "2021-02-14T07:16:56.370Z",
      "end": "2022-01-08T18:41:01.238Z"
  },
  {
      "id": "1b784a7c-51c6-44d0-8c86-48836c84023a",
      "begin": "2021-03-08T11:40:33.056Z",
      "end": "2021-03-30T02:50:09.658Z"
  },
  {
      "id": "1c4635a7-cc76-486f-9bc0-5b1c76905f62",
      "begin": "2021-01-23T01:52:29.654Z",
      "end": "2021-11-06T20:23:46.990Z"
  },
  {
      "id": "1fd6d09a-84c0-4dc0-995c-2c71df262d25",
      "begin": "2022-10-28T01:05:29.565Z",
      "end": "2022-11-04T09:01:55.784Z"
  },
  {
      "id": "20f6e664-f00e-4621-9ca4-5ec588aadeaf",
      "begin": "2022-02-15T11:28:26.965Z",
      "end": "2023-12-24T14:20:37.532Z"
  },
  {
      "id": "20f6e664-f00e-4621-9ca4-5ec588aadeaf",
      "begin": "2020-09-28T16:01:01.523Z",
      "end": "2022-02-07T13:25:05.077Z"
  },
  {
      "id": "234f5e3e-b2a8-4f85-80ee-36e9358d9ac0",
      "begin": "2021-09-01T13:21:47.648Z",
      "end": "2022-11-12T18:56:33.970Z"
  },
  {
      "id": "24bfe59d-9a61-4c9f-a3f1-afe75b313325",
      "begin": "2022-09-30T20:00:08.679Z",
      "end": "2022-10-03T05:36:07.071Z"
  },
  {
      "id": "2bc60a1f-a062-4af3-b1b1-1d7e6517c6a3",
      "begin": "2021-07-02T04:04:24.932Z",
      "end": "2021-12-25T12:30:53.191Z"
  },
  {
      "id": "30583935-c4d4-4250-a53b-a7de297aec86",
      "begin": "2021-02-18T12:57:38.290Z",
      "end": "2021-03-17T20:06:23.935Z"
  },
  {
      "id": "3aa3ee3a-daa5-4cb1-b64c-8213a64d5e50",
      "begin": "2021-05-18T21:28:38.131Z",
      "end": "2021-12-27T10:37:49.668Z"
  },
  {
      "id": "3ac03dee-8062-43a6-86c4-cd3c2c30d0b3",
      "begin": "2021-04-08T08:17:04.537Z",
      "end": "2022-03-21T00:06:25.188Z"
  },
  {
      "id": "3c659cc1-ef18-4903-a0f2-bc9237769d0c",
      "begin": "2021-05-10T18:34:41.288Z",
      "end": "2022-06-15T00:20:02.203Z"
  },
  {
      "id": "3fed6005-5591-4282-8ef2-8a4631a65171",
      "begin": "2022-06-25T10:41:54.466Z",
      "end": "2022-09-29T12:58:53.911Z"
  },
  {
      "id": "4256ad40-152f-4ac0-afc7-a3b896b41aed",
      "begin": "2021-11-06T03:30:57.971Z",
      "end": "2022-10-20T09:16:19.668Z"
  },
  {
      "id": "44522926-7f10-4663-b9dd-d21f5115982b",
      "begin": "2021-07-04T03:38:05.851Z",
      "end": "2022-02-08T09:30:46.913Z"
  },
  {
      "id": "463a90bc-cdaf-4eb0-a9c3-ab0e592a59c2",
      "begin": "2022-10-17T08:48:18.663Z",
      "end": "2022-12-24T18:36:00.955Z"
  },
  {
      "id": "49567cb9-d36e-449e-9182-97e9dca4a790",
      "begin": "2021-11-24T06:47:28.889Z",
      "end": "2022-05-13T21:50:13.488Z"
  },
  {
      "id": "49dfd32b-56e2-4cc8-90e3-c340af5050b5",
      "begin": "2022-03-09T06:24:15.500Z",
      "end": "2022-11-05T06:08:48.416Z"
  },
  {
      "id": "4b5efc35-d3e2-40fe-b249-6d6123d9ec8a",
      "begin": "2021-10-31T01:48:25.750Z",
      "end": "2022-02-15T14:30:02.063Z"
  },
  {
      "id": "518c0aab-dec2-427a-be66-0aaaae3c0991",
      "begin": "2021-01-30T18:33:34.447Z",
      "end": "2022-06-16T19:00:20.418Z"
  },
  {
      "id": "53f011be-9d5a-48c9-9f67-71e0468e3d0a",
      "begin": "2021-01-24T11:42:00.737Z",
      "end": "2021-09-28T05:51:57.371Z"
  },
  {
      "id": "56c2454a-1650-46b9-a744-20ed35b46eb7",
      "begin": "2021-05-13T23:22:51.934Z",
      "end": "2021-12-18T03:02:41.677Z"
  },
  {
      "id": "57ed00b5-dfe8-48fb-8dc3-4d79d19ce124",
      "begin": "2021-10-27T22:58:06.160Z",
      "end": "2022-09-22T16:37:35.646Z"
  },
  {
      "id": "59145941-e668-40c6-b699-d95c3f5784d6",
      "begin": "2021-04-07T03:38:07.581Z",
      "end": "2022-07-13T17:40:51.545Z"
  },
  {
      "id": "59951f87-27a5-4d4a-b49b-73ffc8126297",
      "begin": "2021-01-27T09:19:47.106Z",
      "end": "2022-01-19T07:07:41.890Z"
  },
  {
      "id": "606e3c86-695f-4533-a3b9-cd1c305cef95",
      "begin": "2021-10-06T10:57:21.718Z",
      "end": "2022-03-23T15:04:59.887Z"
  },
  {
      "id": "619346f3-3730-4cf9-9d28-e67a4418ed5d",
      "begin": "2022-02-21T16:08:43.689Z",
      "end": "2022-05-25T23:53:32.894Z"
  },
  {
      "id": "61d58645-10e5-42d6-8673-f23516cb9ba2",
      "begin": "2022-04-05T07:48:33.131Z",
      "end": "2022-07-10T22:41:52.453Z"
  },
  {
      "id": "66ebe88d-7fef-4017-ae77-259595a8da4c",
      "begin": "2022-08-16T00:26:10.856Z",
      "end": "2022-10-19T13:04:04.881Z"
  },
  {
      "id": "66fb2b5d-09e9-4395-9b6a-42040fe1173a",
      "begin": "2022-05-15T08:24:57.884Z",
      "end": "2022-10-26T19:47:24.883Z"
  },
  {
      "id": "67d191ab-94f0-4056-be3f-6a22d6ad112f",
      "begin": "2022-10-03T11:17:33.497Z",
      "end": "2022-11-02T05:49:43.072Z"
  },
  {
      "id": "6de1aa78-93ae-4a3f-bd04-de3144b34a47",
      "begin": "2021-09-03T20:47:55.016Z",
      "end": "2022-05-04T19:38:21.283Z"
  },
  {
      "id": "70656668-571e-49fa-be2e-099c67d136ab",
      "begin": "2022-04-08T16:29:22.128Z",
      "end": "2022-06-09T22:10:59.718Z"
  },
  {
      "id": "70656668-571e-49fa-be2e-099c67d136ab",
      "begin": "2020-07-30T15:05:21.037Z",
      "end": "2023-03-03T21:40:14.145Z"
  },
  {
      "id": "75e96db4-bba2-4035-8f43-df2cbd3da859",
      "begin": "2023-05-11T14:35:15.359Z",
      "end": "2023-12-27T11:19:19.393Z"
  },
  {
      "id": "75e96db4-bba2-4035-8f43-df2cbd3da859",
      "begin": "2021-03-13T23:13:48.815Z",
      "end": "2021-04-15T22:11:23.977Z"
  },
  {
      "id": "7fb4f343-615b-4aa7-8058-d09cab0976c5",
      "begin": "2022-06-27T11:54:26.782Z",
      "end": "2022-10-19T21:55:38.363Z"
  },
  {
      "id": "86b5c819-6a6c-4978-8c51-a2d810bb9318",
      "begin": "2022-02-16T07:01:50.149Z",
      "end": "2022-10-03T07:46:31.410Z"
  },
  {
      "id": "86b5c819-6a6c-4978-8c51-a2d810bb9318",
      "begin": "2022-05-09T04:47:25.211Z",
      "end": "2022-12-02T18:37:16.039Z"
  },
  {
      "id": "86b5c819-6a6c-4978-8c51-a2d810bb9318",
      "begin": "2021-10-24T02:46:52.779Z",
      "end": "2023-04-25T00:04:34.178Z"
  },
  {
      "id": "870e0786-b70b-4509-9403-a0f4420df2d9",
      "begin": "2021-06-23T10:40:17.893Z",
      "end": "2022-07-24T07:50:37.216Z"
  },
  {
      "id": "89131e27-23a7-4f2b-9b2f-e82417de0e7e",
      "begin": "2022-10-17T00:37:35.509Z",
      "end": "2022-11-10T16:38:52.239Z"
  },
  {
      "id": "8ac9330d-c023-4db7-ae83-d8557ee06705",
      "begin": "2021-05-05T07:58:07.080Z",
      "end": "2022-07-28T02:34:41.672Z"
  },
  {
      "id": "8c80f258-34e3-4da6-a0f5-be2d50d3d0d1",
      "begin": "2021-10-20T09:58:09.110Z",
      "end": "2022-04-08T00:30:34.750Z"
  },
  {
      "id": "8da587a0-53ae-4d33-be3f-c0edb5e5bbd7",
      "begin": "2022-03-17T05:23:21.910Z",
      "end": "2022-12-04T05:21:20.371Z"
  },
  {
      "id": "8e13767f-f31e-47b9-be7d-5a10381baf52",
      "begin": "2021-03-06T10:45:43.437Z",
      "end": "2022-08-27T09:24:30.947Z"
  },
  {
      "id": "8f3ad3ec-471a-45e2-b034-2b0396b9e7e1",
      "begin": "2021-10-22T19:53:13.667Z",
      "end": "2022-10-23T04:22:09.994Z"
  },
  {
      "id": "8f7dd431-42d3-42f5-a717-7d12e5da69f3",
      "begin": "2021-02-15T14:51:15.415Z",
      "end": "2021-09-12T14:25:28.092Z"
  },
  {
      "id": "9538dfb2-0b84-48d2-963d-edff0b7fcf64",
      "begin": "2021-10-26T09:32:02.934Z",
      "end": "2022-03-29T02:06:50.661Z"
  },
  {
      "id": "9a85803c-e636-41f9-8ed3-f800d98683eb",
      "begin": "2021-11-05T01:25:20.811Z",
      "end": "2021-12-28T17:00:52.953Z"
  },
  {
      "id": "9d0f22d3-8cc1-47a5-91ed-7534b66a90be",
      "begin": "2022-05-29T20:51:41.867Z",
      "end": "2022-07-30T09:30:15.787Z"
  },
  {
      "id": "9ed11921-1c5b-40f4-be66-adb4e2f016bd",
      "begin": "2022-01-12T08:11:21.333Z",
      "end": "2022-12-13T07:20:57.984Z"
  },
  {
      "id": "9ed11921-1c5b-40f4-be66-adb4e2f016bd",
      "begin": "2021-12-31T23:59:59.999Z",
      "end": "2022-07-17T11:36:59.310Z"
  },
  {
      "id": "a4b2b320-b3b8-4c16-9d0a-13723e993e58",
      "begin": "2022-07-31T14:21:12.831Z",
      "end": "2022-08-21T02:20:51.650Z"
  },
  {
      "id": "a79fe094-087b-4b1e-ae20-ac4bf7fa429b",
      "begin": "2022-02-23T11:33:58.552Z",
      "end": "2022-12-16T00:52:16.126Z"
  },
  {
      "id": "a79fe094-087b-4b1e-ae20-ac4bf7fa429b",
      "begin": "2020-03-03T23:14:30.832Z",
      "end": "2023-12-15T15:12:32.953Z"
  },
  {
      "id": "a9751f3f-dc99-43ba-884b-7b64b232213e",
      "begin": "2021-01-30T14:59:04.712Z",
      "end": "2021-09-30T08:08:49.985Z"
  },
  {
      "id": "ab61f5ad-63b1-4138-b3d5-4a6b82b1d4d4",
      "begin": "2022-03-06T17:51:42.269Z",
      "end": "2022-12-05T20:51:55.292Z"
  },
  {
      "id": "ac9e26a8-8c3e-4936-a0a7-a2fa836698ca",
      "begin": "2021-06-27T19:24:59.860Z",
      "end": "2022-11-16T04:20:53.277Z"
  },
  {
      "id": "ad159fb3-7788-4977-8bed-187d6e4846ef",
      "begin": "2022-11-20T16:09:14.761Z",
      "end": "2022-12-19T20:30:32.198Z"
  },
  {
      "id": "ad54e466-811f-4ba7-814b-d6c7baf75d6e",
      "begin": "2022-08-13T09:36:23.283Z",
      "end": "2022-11-06T03:56:26.615Z"
  },
  {
      "id": "af164315-3aa4-4f30-a5bd-913e6fbc1d5b",
      "begin": "2021-09-02T00:08:32.822Z",
      "end": "2022-08-10T07:43:11.178Z"
  },
  {
      "id": "b060b709-ba0f-47cf-b5e4-4520e2f925b0",
      "begin": "2021-05-08T14:57:52.192Z",
      "end": "2021-06-09T10:18:53.066Z"
  },
  {
      "id": "b7302f6b-f734-4f0e-b0b2-9f78f3a73945",
      "begin": "2022-09-11T18:46:57.116Z",
      "end": "2022-12-06T12:19:02.232Z"
  },
  {
      "id": "ba471fc1-2b38-4e16-8a8f-f7f871ce2f75",
      "begin": "2021-05-30T00:36:53.132Z",
      "end": "2022-07-29T22:49:02.380Z"
  },
  {
      "id": "bb1e4047-ce01-461d-b0dd-839bf1b25379",
      "begin": "2022-06-04T12:25:06.954Z",
      "end": "2022-11-05T01:09:56.476Z"
  },
  {
      "id": "bfa638c8-456c-4d3a-a742-0aa9ed537b77",
      "begin": "2022-11-25T04:40:17.246Z",
      "end": "2022-12-01T22:05:18.013Z"
  },
  {
      "id": "c1b7ae52-8c8c-43a3-baeb-bf518039bebc",
      "begin": "2022-02-12T02:56:34.563Z",
      "end": "2022-12-22T09:17:56.763Z"
  },
  {
      "id": "c235eaac-deac-4cd5-a34d-0e75eda6c5f2",
      "begin": "2021-01-21T00:49:53.881Z",
      "end": "2021-08-17T02:25:04.000Z"
  },
  {
      "id": "c3a7822f-ba15-4b4e-95e7-1346cbe0cc8e",
      "begin": "2022-06-24T05:52:20.669Z",
      "end": "2022-11-07T18:44:00.457Z"
  },
  {
      "id": "c54ceb35-67dc-4770-a9ad-c5342bad385a",
      "begin": "2022-01-12T19:57:31.038Z",
      "end": "2022-01-19T10:22:02.834Z"
  },
  {
      "id": "c72824b2-ec07-4a8a-8c11-acbb6e5a8ede",
      "begin": "2021-01-01T14:49:27.907Z",
      "end": "2022-08-09T02:26:00.058Z"
  },
  {
      "id": "c730ea43-d170-4df9-89e6-58e115ee7da2",
      "begin": "2021-03-26T01:34:38.807Z",
      "end": "2021-10-18T03:56:35.712Z"
  },
  {
      "id": "c8ce2e63-fb05-4109-8ff2-5e3fc5d03e81",
      "begin": "2021-12-30T13:44:48.101Z",
      "end": "2022-03-08T06:22:23.283Z"
  },
  {
      "id": "ca38fcaa-4b36-4a73-8433-1a441ce241ce",
      "begin": "2022-08-06T03:58:13.620Z",
      "end": "2022-11-10T10:23:54.760Z"
  },
  {
      "id": "d548aa76-83e9-40eb-96c2-c36173ab0ed1",
      "begin": "2021-12-18T04:10:56.187Z",
      "end": "2022-11-08T03:07:09.097Z"
  },
  {
      "id": "d67e787a-5b89-4634-a990-c0c59b512b4a",
      "begin": "2021-06-15T19:25:39.047Z",
      "end": "2022-08-04T11:42:29.100Z"
  },
  {
      "id": "d99a30b7-ed8c-4500-80d7-a9fb6f9a052b",
      "begin": "2021-03-27T06:01:52.211Z",
      "end": "2021-08-05T23:52:44.861Z"
  },
  {
      "id": "d9a45c4c-b5d5-4318-a4c5-bcb381ce2b41",
      "begin": "2021-04-29T18:40:30.558Z",
      "end": "2022-07-20T12:43:30.300Z"
  },
  {
      "id": "db933b2a-6573-4408-9df8-eb38211beb88",
      "begin": "2022-06-12T05:13:05.989Z",
      "end": "2022-11-19T03:02:36.799Z"
  },
  {
      "id": "de10b9c8-9d8b-4dc2-8e3a-64438b9d0206",
      "begin": "2022-02-18T03:08:13.172Z",
      "end": "2022-03-04T13:23:56.143Z"
  },
  {
      "id": "e0d814c4-aeb5-41f4-82b3-d2c80fc077ed",
      "begin": "2021-02-11T08:12:54.230Z",
      "end": "2022-02-22T00:48:07.574Z"
  },
  {
      "id": "e74549b3-5c31-4bb2-baef-8b5835f0afdb",
      "begin": "2021-08-11T21:52:06.798Z",
      "end": "2022-02-04T06:25:54.095Z"
  },
  {
      "id": "e9878a77-e263-4678-bfe2-d88c06f8ca9d",
      "begin": "2021-07-27T12:38:30.105Z",
      "end": "2021-08-27T03:04:42.230Z"
  },
  {
      "id": "eb23e819-59ea-4ec8-ab13-6b2276315953",
      "begin": "2022-05-21T09:47:09.612Z",
      "end": "2022-07-10T08:10:43.978Z"
  },
  {
      "id": "eb8dbbee-8e72-4d04-8a53-a3fdbf4fd58d",
      "begin": "2021-07-07T05:19:12.231Z",
      "end": "2022-11-15T01:38:45.393Z"
  },
  {
      "id": "eebd90ec-5ec0-43b1-8c94-b55a49f4e546",
      "begin": "2021-10-05T22:39:16.858Z",
      "end": "2022-11-07T16:18:09.848Z"
  },
  {
      "id": "f6dc42a3-82d0-4928-bd85-b87d4489b42d",
      "begin": "2021-12-07T09:08:13.472Z",
      "end": "2022-12-01T20:27:20.609Z"
  },
  {
      "id": "f73311db-4799-4bfb-9e18-83c282835d83",
      "begin": "2022-03-13T03:16:10.227Z",
      "end": "2022-10-13T09:03:16.614Z"
  },
  {
      "id": "fb175f5c-a268-4bf1-9d47-1d6572dbd45d",
      "begin": "2022-07-21T22:13:01.842Z",
      "end": "2022-10-13T12:59:26.050Z"
  },
  {
      "id": "fc8604a3-be32-4b52-b5b6-57e4f82137e1",
      "begin": "2022-04-06T10:47:35.455Z",
      "end": "2022-08-03T04:32:57.918Z"
  },
  {
      "id": "fd125738-f463-4177-b865-334e96de81b4",
      "begin": "2021-10-17T17:03:45.288Z",
      "end": "2022-04-13T23:57:34.374Z"
  },
  {
      "id": "fd81dd4b-df47-47e0-9ad1-5011b2d2d6da",
      "begin": "2021-08-11T22:23:54.345Z",
      "end": "2022-09-16T16:59:05.774Z"
  },
  {
      "id": "fe4ba9e4-8b25-4969-8e8a-a0e2c3eaf88f",
      "begin": "2021-03-20T13:10:37.538Z",
      "end": "2021-12-09T07:27:56.450Z"
  },
  {
      "id": "fed901ec-5a48-4627-bf29-bbc5cc5d612c",
      "begin": "2022-06-15T06:25:44.280Z",
      "end": "2022-07-30T18:37:14.228Z"
  },
  {
      "id": "ff068d31-93ce-4f61-948f-bf0560bf3dfe",
      "begin": "2021-01-08T22:05:12.811Z",
      "end": "2021-02-13T07:15:36.101Z"
  }
]};

const siteInfoMock = {
  "data": {
    id: 'norwich-pear-tree',
    name: 'Norwich Pear Tree',
    devices: [
      { id: '111183e7-fb90-436b-9951-63392b36bdd2', name: 'Battery 1' },
      { id: '86b5c819-6a6c-4978-8c51-a2d810bb9318', name: 'Battery 2' },
      { id: '70656668-571e-49fa-be2e-099c67d136ab', name: 'Battery 3' },
      { id: '9ed11921-1c5b-40f4-be66-adb4e2f016bd', name: 'Battery 4' },
      { id: 'a79fe094-087b-4b1e-ae20-ac4bf7fa429b', name: 'Battery 5' },
      { id: '0e4d59ba-43c7-4451-a8ac-ca628bcde417', name: 'Battery 6' },
      { id: '20f6e664-f00e-4621-9ca4-5ec588aadeaf', name: 'Battery 7' },
      { id: '75e96db4-bba2-4035-8f43-df2cbd3da859', name: 'Battery 8' }
    ]
  }  
}; 

const filteredOutagesMock = [
  {
    id: '0e4d59ba-43c7-4451-a8ac-ca628bcde417',
    begin: '2022-02-15T11:28:26.735Z',
    end: '2022-08-28T03:37:48.568Z'
  },
  {
    id: '111183e7-fb90-436b-9951-63392b36bdd2',
    begin: '2022-01-01T00:00:00.000Z',
    end: '2022-09-15T19:45:10.341Z'
  },
  {
    id: '111183e7-fb90-436b-9951-63392b36bdd2',
    begin: '2022-02-18T01:01:20.142Z',
    end: '2022-08-15T14:34:50.366Z'
  },
  {
    id: '20f6e664-f00e-4621-9ca4-5ec588aadeaf',
    begin: '2022-02-15T11:28:26.965Z',
    end: '2023-12-24T14:20:37.532Z'
  },
  {
    id: '70656668-571e-49fa-be2e-099c67d136ab',
    begin: '2022-04-08T16:29:22.128Z',
    end: '2022-06-09T22:10:59.718Z'
  },
  {
    id: '75e96db4-bba2-4035-8f43-df2cbd3da859',
    begin: '2023-05-11T14:35:15.359Z',
    end: '2023-12-27T11:19:19.393Z'
  },
  {
    id: '86b5c819-6a6c-4978-8c51-a2d810bb9318',
    begin: '2022-02-16T07:01:50.149Z',
    end: '2022-10-03T07:46:31.410Z'
  },
  {
    id: '86b5c819-6a6c-4978-8c51-a2d810bb9318',
    begin: '2022-05-09T04:47:25.211Z',
    end: '2022-12-02T18:37:16.039Z'
  },
  {
    id: '9ed11921-1c5b-40f4-be66-adb4e2f016bd',
    begin: '2022-01-12T08:11:21.333Z',
    end: '2022-12-13T07:20:57.984Z'
  },
  {
    id: 'a79fe094-087b-4b1e-ae20-ac4bf7fa429b',
    begin: '2022-02-23T11:33:58.552Z',
    end: '2022-12-16T00:52:16.126Z'
  }
];

const postSiteOutagesMock = {};

const outagesWithNamesMock =   [
  {
    id: '0e4d59ba-43c7-4451-a8ac-ca628bcde417',
    begin: '2022-02-15T11:28:26.735Z',
    end: '2022-08-28T03:37:48.568Z',
    name: 'Battery 6'
  },
  {
    id: '111183e7-fb90-436b-9951-63392b36bdd2',
    begin: '2022-01-01T00:00:00.000Z',
    end: '2022-09-15T19:45:10.341Z',
    name: 'Battery 1'
  },
  {
    id: '111183e7-fb90-436b-9951-63392b36bdd2',
    begin: '2022-02-18T01:01:20.142Z',
    end: '2022-08-15T14:34:50.366Z',
    name: 'Battery 1'
  },
  {
    id: '20f6e664-f00e-4621-9ca4-5ec588aadeaf',
    begin: '2022-02-15T11:28:26.965Z',
    end: '2023-12-24T14:20:37.532Z',
    name: 'Battery 7'
  },
  {
    id: '70656668-571e-49fa-be2e-099c67d136ab',
    begin: '2022-04-08T16:29:22.128Z',
    end: '2022-06-09T22:10:59.718Z',
    name: 'Battery 3'
  },
  {
    id: '75e96db4-bba2-4035-8f43-df2cbd3da859',
    begin: '2023-05-11T14:35:15.359Z',
    end: '2023-12-27T11:19:19.393Z',
    name: 'Battery 8'
  },
  {
    id: '86b5c819-6a6c-4978-8c51-a2d810bb9318',
    begin: '2022-02-16T07:01:50.149Z',
    end: '2022-10-03T07:46:31.410Z',
    name: 'Battery 2'
  },
  {
    id: '86b5c819-6a6c-4978-8c51-a2d810bb9318',
    begin: '2022-05-09T04:47:25.211Z',
    end: '2022-12-02T18:37:16.039Z',
    name: 'Battery 2'
  },
  {
    id: '9ed11921-1c5b-40f4-be66-adb4e2f016bd',
    begin: '2022-01-12T08:11:21.333Z',
    end: '2022-12-13T07:20:57.984Z',
    name: 'Battery 4'
  },
  {
    id: 'a79fe094-087b-4b1e-ae20-ac4bf7fa429b',
    begin: '2022-02-23T11:33:58.552Z',
    end: '2022-12-16T00:52:16.126Z',
    name: 'Battery 5'
  }
]



const {
  getAllOutages,
  getSiteInfo,
  filterOutages,
  attachDeviceNames,
  postSiteOutages,
} = require('./index.js');


describe('getAllOutages', () => {
  it('should call axios with the correct parameters and return the data', async () => {
    const testData = outagesMock
  
    axiosInstance.get = jest.fn().mockResolvedValue(testData);

    const result = await getAllOutages(axiosInstance);

    expect(result).toEqual(testData.data);
  });
});

describe('getSiteInfo', () => {
  it('should call axios with the correct parameters and return the data', async () => {
    const testData = siteInfoMock
    const siteId = 'norwich-pear-tree';

    axiosInstance.get = jest.fn().mockResolvedValue(testData);

    const result = await getSiteInfo(siteId, axiosInstance);

    expect(result).toEqual(testData.data);
  });
});

describe('filterOutages', () => {
  it('should return only valid outages', () => {
    const outages = outagesMock.data
    const siteInfo = siteInfoMock.data

    const result = filterOutages(outages, siteInfo);

    expect(result.length).toBe(10);
    expect(result).toEqual(filteredOutagesMock);
  });
});

describe('attachDeviceNames', () => {
  it('should add device names to outages', () => {
    const filteredOutages = filteredOutagesMock
    const siteInfo = siteInfoMock.data

    const result = attachDeviceNames(filteredOutages, siteInfo);

    expect(result).toEqual(outagesWithNamesMock);
  });
});

describe('postSiteOutages', () => {
  it('should call axios with the correct parameters and return the data', async () => {
  
    const siteId = 'norwich-pear-tree';
    const outages = filteredOutagesMock
    
    const mockResult = {
      status: 200,
      data: {},
      statusText: 'OK',
    }

    axiosInstance.post = jest.fn().mockResolvedValue(mockResult);

    const result = await postSiteOutages(siteId, outages, axiosInstance);

    expect(result).toEqual(200);
  });
});

// Test cases for edge scenarios
describe('Edge scenarios', () => {
  it('should handle empty outages list', () => {
    const outages = [];
    const siteInfo = {
      devices: [
        {
          id: '0bd995be-f298-40dd-83d3-830b23487aee',
          name: 'Device 1',
        },
      ],
    };

    const result = filterOutages(outages, siteInfo);

    expect(result.length).toBe(0);
  });

  it('should handle empty siteInfo devices list', () => {
    const outages = [
      {
        id: '0bd995be-f298-40dd-83d3-830b23487aee',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-09-15T19:45:10.341Z',
      },
    ];
    const siteInfo = {
      devices: [],
    };

    const result = filterOutages(outages, siteInfo);

    expect(result.length).toBe(0);
  });

  it('should handle outages with no matching device', () => {
    const outages = [
      {
        id: 'nonexistent-device-id',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-09-15T19:45:10.341Z',
      },
    ];
    const siteInfo = {
      devices: [
        {
          id: '0bd995be-f298-40dd-83d3-830b23487aee',
          name: 'Device 1',
        },
      ],
    };

    const result = filterOutages(outages, siteInfo);

    expect(result.length).toBe(0);
  });
});
