
// import task from "../model/Task.js";

 const taskQuery = async (filters,userId) => {
console.log(userId);
  let filter = {};
  let hoursFilter = {};
  let sortOptions = {};
  let page = 1;
  let limit = 10;
  let skip = 0;
  const MAX_LIMIT = 100;
  let fields = [];
  const allowedFields = [
    "title",
    "description",
    "priority",
    "completed",
    "estimatedHours",
    "createdAt",
    "updatedAt",
  ];
const allowedSortFields = [
    "title",
    "priority",
    "completed",
    "estimatedHours",
    "createdAt"
];
  if (filters.priority) {
    filter.priority = {
      $in: filters.priority.split(","),
    };
  }

  filter.owner=userId;
console.log(filter);

  if (filters.completed) {
    if (filters.completed !== "true" && filters.completed !== "false") {
        throw new AppError("completed must be true or false", 400);
    }

    filter.completed = filters.completed === "true";
}
if (filters.minHours) {
    const minHours = Number(filters.minHours);

    if (Number.isNaN(minHours)) {
        throw new AppError(
            "minHours must be a number",
            400
        );
    }

    hoursFilter.$gte = minHours;
}
if (filters.maxHours) {
    const maxHours = Number(filters.maxHours);

    if (Number.isNaN(maxHours)) {
        throw new AppError(
            "maxHours must be a number",
            400
        );
    }

    hoursFilter.$lte = maxHours;
}
  if (Object.keys(hoursFilter).length > 0) {
    filter.estimatedHours = hoursFilter;
  }

if (filters.dueDate) {
    const dueDate = new Date(filters.dueDate);

    if (Number.isNaN(dueDate.getTime())) {
        throw new AppError(
            "dueDate must be a valid date",
            400
        );
    }

    filter.dueDate = {
        $lt: dueDate
    };
}

  if (filters.search) {
    filter.$or = [
      {
        title: {
          $regex: filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          $options: "i",
        },
      },
      {
        description: {
          $regex: filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          $options: "i",
        },
      },
    ];
  } 


  if (filters.sortFieldParam) {
    const { sortFieldParam } = filters;
    const sortFields = sortFieldParam.split(",");
    let sortOrder;
    let sortField;
    sortFields.forEach(sortFieldp => {
    // process field
    sortOrder = sortFieldp?.startsWith("-") ? -1 : 1;
    sortField = sortFieldp?.startsWith("-") ? sort.slice(1) : sortFieldP;
     if (!allowedSortFields.includes(sortField)) {
    throw new AppError(
        `Cannot sort by ${sortField}`,
        400
    );
}
    sortOptions[sortField] = sortOrder;
});
  } else {
    sortOptions.createdAt = -1;
  }


  
if (filters.page || filters.limit) {
    if (filters.page) {
    page = Number(filters.page);

    if (!Number.isInteger(page) || page < 1) {
        throw new AppError(
            "page must be a positive integer",
            400
        );
    }
}

if (filters.limit) {
    limit = Number(filters.limit);

    if (!Number.isInteger(limit) || limit < 1) {
        throw new AppError(
            "limit must be a positive integer",
            400
        );
    }

    if (limit > MAX_LIMIT) {
        throw new AppError(
            `limit cannot be greater than ${MAX_LIMIT}`,
            400
        );
    }
}

skip = (page - 1) * limit;
  }

  if (filters.fields) {
    fields = filters.fields.split(",");
     console.log('fields');
    const allowedcheck = fields.every((element) =>
      allowedFields.includes(element),
    );
    if (!allowedcheck) {
      throw new AppError("Select Proper field selection", 400);
    }
  }
  console.log(fields.join(" "));
  
  

  return {
  filter,
  fields,
  sortOptions,
  skip,
  limit,
  page
};
}

export default taskQuery;