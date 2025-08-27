"use client";

import React, { useState } from "react";
import data from "@/data/example-data.json";

function Table() {
  const [tableData, setTableData] = useState(data);
  const [openRows, setOpenRows] = useState({});

  const toggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteMainRow = (idToDelete) => {
    setTableData(tableData.filter((item) => item.data.ID !== idToDelete));
  };

  const deleteNemesis = (mainId, nemesisId) => {
    setTableData(
      tableData.map((item) => {
        if (item.data.ID === mainId && item.children?.has_nemesis) {
          return {
            ...item,
            children: {
              ...item.children,
              has_nemesis: {
                ...item.children.has_nemesis,
                records: item.children.has_nemesis.records.filter(
                  (nemesis) => nemesis.data.ID !== nemesisId
                ),
              },
            },
          };
        }
        return item;
      })
    );
  };

  const deleteSecrete = (mainId, nemesisId, secreteId) => {
    setTableData(
      tableData.map((item) => {
        if (item.data.ID === mainId && item.children?.has_nemesis) {
          return {
            ...item,
            children: {
              ...item.children,
              has_nemesis: {
                ...item.children.has_nemesis,
                records: item.children.has_nemesis.records.map((nemesis) => {
                  if (
                    nemesis.data.ID === nemesisId &&
                    nemesis.children?.has_secrete
                  ) {
                    return {
                      ...nemesis,
                      children: {
                        ...nemesis.children,
                        has_secrete: {
                          ...nemesis.children.has_secrete,
                          records: nemesis.children.has_secrete.records.filter(
                            (secrete) => secrete.data.ID !== secreteId
                          ),
                        },
                      },
                    };
                  }
                  return nemesis;
                }),
              },
            },
          };
        }
        return item;
      })
    );
  };

  const renderNemesisRow = (nemesis, mainId) => {
    return (
      <React.Fragment>
        <tr className="bg-[#77ceac] text-[#232323] font-bold">
          <td className="py-2 px-4">ID</td>
          <td className="py-2 px-4">Character ID</td>
          <td className="py-2 px-4">Is alive?</td>
          <td className="py-2 px-4">Years</td>
          <td className="py-2 px-4">delete</td>
        </tr>
        <tr className="bg-[#3a3a3a]">
          <td className="py-2 px-2">{nemesis.data.ID}</td>
          <td className="py-2 px-2">{nemesis.data["Character ID"]}</td>
          <td className="py-2 px-2">{nemesis.data["Is alive?"].toString()}</td>
          <td className="py-2 px-2">{nemesis.data.Years}</td>
          <td className="py-2 px-2">
            <button
              onClick={() => deleteNemesis(mainId, nemesis.data.ID)}
              className="cursor-pointer"
            >
              ❌
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  const renderSecreteRow = (secrete, mainId, nemesisId) => {
    return (
      <React.Fragment>
        <tr className="bg-[#77ceac] text-[#232323] font-bold">
          <td className="py-2 px-4">ID</td>
          <td className="py-2 px-4">Nemesis ID</td>
          <td className="py-2 px-4">Secrete Code</td>
          <td className="py-2 px-4">delete</td>
        </tr>
        <tr className="bg-[#4a4a4a]">
          <td className="py-2 px-4">{secrete.data.ID}</td>
          <td className="py-2 px-4">{secrete.data["Nemesis ID"]}</td>
          <td className="py-2 px-4">{secrete.data["Secrete Code"]}</td>
          <td className="py-2 px-4">
            <button
              onClick={() => deleteSecrete(mainId, nemesisId, secrete.data.ID)}
              className="cursor-pointer"
            >
              ❌
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  return (
    <div>
      <table className="table-auto font-normal bg-[#282727] text-white w-full">
        <thead className="bg-[#77ceac] text-[#232323]">
          <tr>
            <th className="py-2 px-2"></th>
            <th className="py-2 px-2">ID</th>
            <th className="py-2 px-2">Name</th>
            <th className="py-2 px-2">Gender</th>
            <th className="py-2 px-2">Ability</th>
            <th className="py-2 px-2">Minimal distance</th>
            <th className="py-2 px-2">Weight</th>
            <th className="py-2 px-2">Born</th>
            <th className="py-2 px-2">In space since</th>
            <th className="py-2 px-2">Beer consumption (l/y)</th>
            <th className="py-2 px-2">Knows the answer?</th>
            <th className="py-2 px-2">delete</th>
          </tr>
        </thead>
        <tbody className="text-center font-normal">
          {tableData.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="even:bg-[#232323] odd:bg-[#191919]">
                <td className="py-2 px-2">
                  {item.children?.has_nemesis && (
                    <button
                      onClick={() => toggleRow(item.data.ID)}
                      className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    >
                      {openRows[item.data.ID] ? "−" : "+"}
                    </button>
                  )}
                </td>
                <td className="py-2 px-4">{item.data.ID}</td>
                <td className="py-2 px-4">{item.data.Name}</td>
                <td className="py-2 px-4">{item.data.Gender}</td>
                <td className="py-2 px-4">{item.data.Ability}</td>
                <td className="py-2 px-4">{item.data["Minimal distance"]}</td>
                <td className="py-2 px-4">{item.data.Weight}</td>
                <td className="py-2 px-4">{item.data.Born}</td>
                <td className="py-2 px-4">{item.data["In space since"]}</td>
                <td className="py-2 px-4">
                  {item.data["Beer consumption (l/y)"]}
                </td>
                <td className="py-2 px-4">
                  {item.data["Knows the answer?"].toString()}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => deleteMainRow(item.data.ID)}
                    className="cursor-pointer"
                  >
                    ❌
                  </button>
                </td>
              </tr>
              {openRows[item.data.ID] &&
                item.children?.has_nemesis?.records.map((nemesis, nIndex) => (
                  <React.Fragment key={`nemesis-${nIndex}`}>
                    {renderNemesisRow(nemesis, item.data.ID)}
                    {nemesis.children?.has_secrete?.records.map(
                      (secrete, sIndex) => (
                        <React.Fragment key={`secrete-${sIndex}`}>
                          {renderSecreteRow(
                            secrete,
                            item.data.ID,
                            nemesis.data.ID
                          )}
                        </React.Fragment>
                      )
                    )}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
