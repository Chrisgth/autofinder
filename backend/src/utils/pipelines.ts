import { PipelineStage } from "mongoose";

export const individualSiteDataPipeline: PipelineStage[] = [
  {
    $lookup: {
      from: "models",
      let: { makeDataSite: "$dataSite", makeDataValue: "$dataValue" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$dataSite", "$$makeDataSite"] },
                { $eq: ["$makeDataValue", "$$makeDataValue"] },
              ],
            },
          },
        },
        {
          $sort: { value: 1 },
        },
      ],
      as: "models",
    },
  },
  {
    $sort: { value: 1 },
  },
];

export const combinedDataPipeline: PipelineStage[] = [
  {
    $lookup: {
      from: "models",
      let: {
        makeDataSite: "$dataSite",
        makeDataValue: "$dataValue",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$dataSite", "$$makeDataSite"],
                },
                {
                  $eq: ["$makeDataValue", "$$makeDataValue"],
                },
              ],
            },
          },
        },
      ],
      as: "models",
    },
  },
  {
    $group: {
      _id: {
        $cond: {
          if: {
            $ne: ["$commonValue", null],
          },
          then: "$commonValue",
          else: "$value",
        },
      },
      totalCount: {
        $sum: "$count",
      },
      models: {
        $push: "$models",
      },
    },
  },
  {
    $project: {
      _id: 0,
      value: "$_id",
      dataValue: 1,
      totalCount: 1,
      models: {
        $reduce: {
          input: "$models",
          initialValue: [],
          in: {
            $concatArrays: ["$$value", "$$this"],
          },
        },
      },
    },
  },
  {
    $unwind: "$models",
  },
  {
    $group: {
      _id: {
        value: "$value",
        modelValue: "$models.value",
      },
      totalCount: {
        $first: "$totalCount",
      },
      value: {
        $first: "$value",
      },
      modelCount: {
        $sum: "$models.count",
      },
    },
  },
  {
    $group: {
      _id: "$_id.value",
      value: {
        $first: "$value",
      },
      totalCount: {
        $first: "$totalCount",
      },
      models: {
        $push: {
          value: "$_id.modelValue",
          totalCount: "$modelCount",
        },
      },
    },
  },
  {
    $unwind: "$models",
  },
  {
    $sort: {
      "models.value": 1,
    },
  },
  {
    $group: {
      _id: "$_id",
      value: {
        $first: "$value",
      },
      totalCount: {
        $first: "$totalCount",
      },
      models: {
        $push: "$models",
      },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
];
