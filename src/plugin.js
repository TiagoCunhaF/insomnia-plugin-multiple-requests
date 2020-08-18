module.exports.requestGroupActions = [
  {
    label: "Send Requests",
    action: async (context, data) => {
      const { requests } = data;

      function formatElapsedTime(elapsedTime) {

        if (elapsedTime < 1000)
          return `${Math.round(elapsedTime)} ms`;

        if (elapsedTime < 1000 * 60)
          return `${Math.round(elapsedTime / 1000 * 100) / 100} s`;

        return `${Math.round(elapsedTime / (1000 * 60) * 100) / 100} m`;

      }

      let results = [];
      for (const request of requests) {
        const response = await context.network.sendRequest(request);
        const style =
          response.statusCode !== 200
            ? "padding:5px; color: var(--color-font-danger); background: var(--color-danger)"
            : "padding:5px; color: var(--color-font-success); background: var(--color-success)";
        results.push(
          `<li style="margin: 8px; height: 20px"><div style="width: 250px; display: inline-block;">${request.name}</div> <span style="${style}")>${response.statusCode} - ${formatElapsedTime(response.elapsedTime)}</span></li>`
        );
      }

      const html = `<ul style="column-count: ${
        results.length > 10 ? 2 : 1
        };">${results.join("\n")}</ul>`;

      context.app.showGenericModalDialog("Results", { html });
    },
  },
];
