var aiapy_columnDefs = [
  {
    headerName: "Crop",
    field: "Crop",
    rowGroup: true,
    hide: true,
    sortable: false,
    floatingFilter: true,
    pinned: "left",
    lockPosition: true,
    suppressNavigable: true,
  },
  {
    headerName: "Crop Category",
    field: "Crop Category",
    rowGroup: false,
    hide: true,
    sortable: false,
  },
  {
    headerName: "Crop Sub-Category",
    field: "Crop Sub-Category",
    hide: true,
    sortable: false,
  },
  {
    headerName: "Season",
    field: "Season",
    rowGroup: true,
    hide: true,
    sortable: false,
    pinned: "left",
  },
  {
    headerName: "Metric",
    field: "Metric",
    pivot: true,
    hide: true,
    filter: false,
  },
  {
    headerName: "Crop Year",
    field: "Crop Year",
    pivot: true,
    hide: true,
    sort: "desc",
  },
  {
    headerName: "Value",
    field: "Value",
    filter: false,
    Value: true,
    hide: true,
    aggFunc: "sum",
    sortable: true,
  },
];

var aiapygridOptions = {
  columnDefs: aiapy_columnDefs,
  rowData: [],
  removePivotHeaderRowWhenSingleValueColumn: true,
  pivotMode: true,
  groupMaintainOrder: true,
  sideBar: "filters",
  overlayLoadingTemplate:
    '<span class="ag-overlay-loading-center">Please wait while rows are loading...</span>',
  localeText: {
    noRowsToShow: "Custom No Data Message", // Set custom "No Data" message
  },
  defaultColDef: {
    valueFormatter: numberToFixedDecimal,
    minWidth: 80,
    maxWidth: 165,
    // wrapText: true,
    // autoHeight: true,
    /*autoGroupColumnDef: {minWidth: 250,},*/
    editable: true,
    sortable: true,
    resizable: true,
    suppressSizeToFit: false,
    flex: 1,
    floatingFilter: false,
    // width: "size-to-fit",
    filter: "agSetColumnFilter",
    filterParams: {
      excelMode: "windows",
      closeOnApply: false,
      // defaultToNothingSelected: true,
      // suppressSelectAll: true,
      // suppressMiniFilter: true,
      // selectAllOnFilter: false,
      // selectAllOnMiniFilter: false,
      buttons: ["apply", "reset", "cancel"],
    },
  },
  enableRangeSelection: true,
  animateRows: true,
  suppressDragLeaveHidesColumns: true,
  suppressMenuHide: true,
  suppressNoRowsOverlay: true,
  suppressColumnVirtualisation: true,
  suppressContextMenu: true,
  suppressCellSelection: true,
  suppressRowClickSelection: true,
  suppressScrollOnNewData: true,
  suppressTabbing: true,
  domLayout: "autoHeight",
  overlayLoadingTemplate:
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
  overlayNoRowsTemplate:
    '<span class="ag-overlay-no-rows-center">No data to show</span>',
  rowSelection: "multiple",
  rowDeselection: true,
  // onGridReady: function(params) {
  //   setTimeout(function() {
  //     params.api.sizeColumnsToFit();
  //   });
  // },
  // onGridReady: function(params) {
  //   params.columnApi.autoSizeAllColumns();
  // },
  // pagination: true,
  // paginationPageSize: 10,
  /*onGridReady: function (gridOptions) {
    gridOptions.api.setFilterModel({
      State: {
        type: "set",
        values: ["All India"],
      },
      /* Metric: {
         type: "set",
         values: ["Area"],
       },
       "Unit Of Measure": {
         type: "set",
         values: ["Hectares"],
       },*/
  /*});
},*/
  groupDefaultExpanded: 2,
  groupDisplayType: "multipleColumns",
  groupHideOpenParents: true,
  autoGroupColumnDef: {
    /*'headerName': 'Custom name',*/
    wrapText: true,
    autoHeight: true,
    pinned: "left",
    floatingFilter: false,
    filter: "agGroupColumnFilter",
    // minWidth: 150,
    cellRendererParams: {
      suppressCount: true,
    },
    suppressCellSelection: true,
    /*filter: "agSetColumnFilter",
                filterParams: {
                    excelMode: 'windows',
                },
                floatingFilter: true,*/
  },
  /*sideBar: {
                defaultToolPanel: 'filters'
            },*/
  domLayout: "normal",
  onFilterOpened: (dataGridOptions) => {
    const clickBinderClass = "click-binded";
    const cancel = dataGridOptions.eGui.querySelector(
      `.ag-filter-apply-panel [ref='cancelFilterButton']:not(.${clickBinderClass})`
    );
    const apply = dataGridOptions.eGui.querySelector(
      `.ag-filter-apply-panel [ref="applyFilterButton"]:not(.${clickBinderClass})`
    );
    const closeOnClick = () => {
      let filterInstance = dataGridOptions.api.getFilterInstance(
        dataGridOptions.column.colDef
      );
      if (filterInstance?.hidePopup) {
        filterInstance.hidePopup();
      } else {
        dataGridOptions.api.closeToolPanel();
      }
    };
    if (cancel) {
      cancel.addEventListener("click", closeOnClick);
      cancel.classList.add(clickBinderClass);
    }
    if (apply && false) {
      apply.addEventListener("click", closeOnClick);
      apply.classList.add(clickBinderClass);
    }
  },
  /* suppressSizeToFit: false,*/
  /*onFilterChanged: (params) => {
    var titlePrefix = document.getElementById("prefix-title");

    var { State: { values = [] } = {} } = params.api.getFilterModel() || {};
    if (values[0]) {
      titlePrefix.innerHTML = `${values[0] || ""} `;
    } else {
      titlePrefix.innerHTML = "All India ";
    }
  },*/
  getRowNodeId: function (data) {
    return data.id;
  },
  onRowGroupOpened: function (params) {
    params.node.setExpanded(true);
  },
  isRowGroupOpen: function (params) {
    return true;
  },
  processPivotResultColDef: (colDef) => {
    colDef.headerClass = (colDef.pivotKeys?.[0] || "").toLowerCase();
    colDef.columnWidth = 60;
    colDef.cellClassRules = getNumberRules();
  },
  processPivotResultColGroupDef: (colGroupDef) => {
    colGroupDef.headerClass = (colGroupDef.pivotKeys?.[0] || "").toLowerCase();
    colGroupDef.columnWidth = 60;
    colGroupDef.cellClassRules = getNumberRules();
  },
  defaultExcelExportParams: {
    author: "DEPARTMENT OF AGRICULTURE & FARMERS WELFARE",
    sheetName: "Data Sheet",
    columnWidth: 60,
    fontSize: 10,
    wrapText: true,
    pageSetup: {
      orientation: "Landscape",
      pageSize: "A4",
    },
    processCellCallback: numberProcessCellCallback,
    cellClassRules: getNumberRules(),
  },
  excelStyles: getExcelConfigurations(),
};

function aiapycreateNewGrid(id, rowData, store_initialfilter = []) {
  var aiapyeGridDiv = document.querySelector(`#${id}`);
  aiapyeGridDiv.style.setProperty("height", "70vh");
  var aiapydownloadToCsv = document.querySelector("#aiapy-download-csv");
  var aiapydownloadExcel = document.querySelector("#aiapy-download-excel");

  aiapydownloadToCsv.addEventListener("click", () => {
    aiapygridOptions.api.exportDataAsCsv();
    aiapygridOptions.api.setGroupRemoveSingleChildren(false);
  });

  aiapydownloadExcel.addEventListener("click", () => {
    const title = document.getElementById("aiapy-suffix-title")?.innerText;
    const notification4 = document.getElementById(
      "aiapy-notification4"
    )?.innerText;
    const notification1 = document.getElementById(
      "aiapy-notification1"
    )?.innerText;
    const notification2 = document.getElementById(
      "aiapy-notification2"
    )?.innerText;
    const notification3 = document.getElementById(
      "aiapy-notification3"
    )?.innerText;
    const columnCount =
      document.querySelectorAll(
        `#${id} .ag-header .ag-header-viewport .ag-header-row:nth-child(2) .ag-header-cell`
      ).length +
      document.querySelectorAll(
        `#${id} .ag-header .ag-pinned-left-header .ag-header-row:nth-child(2) .ag-header-cell`
      ).length -
      1;
    aiapygridOptions.api.exportDataAsExcel({
      fileName: `${String(title).replace(/\s/g, "-")}.xlsx`,
      prependContent: [
        {
          cells: [
            {
              styleId: "title",
              data: {
                value: "Ministry of Agriculture & Farmers Welfare",
                type: "String",
              },
              mergeAcross: columnCount,
            },
          ],
        },
        {
          cells: [
            {
              styleId: "title",
              data: {
                value: "Department of Agriculture & Farmers Welfare (DA & FW)",
                type: "String",
              },
              mergeAcross: columnCount,
            },
          ],
        },
        {
          cells: [
            {
              styleId: "title",
              data: {
                value: title,
                type: "String",
              },
              mergeAcross: columnCount,
            },
          ],
        },
        {
          cells: [
            {
              styleId: "subheaders",
              data: {
                value: notification4,
                type: "String",
              },
              mergeAcross: columnCount,
            },
          ],
        },
      ],
      appendContent: [
        {
          cells: [
            {
              styleId: "subfooters",
              data: {
                value: notification1,
                type: "String",
              },
              mergeAcross: columnCount,
            },
          ],
        },
        {
          cells: [
            {
              styleId: "subfooters",
              data: {
                value: notification2,
                type: "String",
              },
              mergeAcross: columnCount,
            },
          ],
        },
        {
          cells: [
            {
              styleId: "subfooters",
              data: {
                value: notification3,
                type: "String",
              },
              mergeAcross: columnCount,
            },
          ],
        },
      ],
      processRowGroupCallback: (params) => {
        return params.node.key;
      },
    });
  });

  if (rowData.length) {
    aiapygridOptions.rowData = rowData;
  }

  aiapygridOptions.columnDefs = aiapy_columnDefs;

  aiapygridOptions.onGridReady = function (aiapygridOptions) {
    aiapygridOptions.api.setFilterModel(store_initialfilter);
    aiapygridOptions.api.closeToolPanel();
  };
  new agGrid.Grid(aiapyeGridDiv, aiapygridOptions);
}

function aiapyupdateData(rowData) {
  aiapygridOptions.api.setColumnDefs(aiapy_columnDefs);
  if (rowData.length) {
    aiapygridOptions.api.showLoadingOverlay();
    setTimeout(() => {
      aiapygridOptions.api.setRowData(rowData);
    }, 1000);
  } else {
    console.log("no rowdata");
    aiapygridOptions.api.setRowData([]);
    aiapygridOptions.suppressNoRowsOverlay = false;
    aiapygridOptions.api.showNoRowsOverlay();
  }
}

function aiapycreateGrid(id, rowData, store_initialfilter) {
  if (!aiapygridOptions?.api) {
    aiapycreateNewGrid(id, rowData, store_initialfilter);
  } else {
    aiapyupdateData(rowData);
  }
}
