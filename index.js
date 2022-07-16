function getAnalytics() {
    const repVal = document.getElementById("search-input");
    const term = repVal.value;
    const URL = `https://api.github.com/repos/${term.replace(/\s+/g, '')}/releases`

    axios.get(URL)
        .then(response => {
            return response.data;
        }).catch(error => {
        }).then(data => {
            const asset_downloads = data.map(release => {
                return {
                    name: release.tag_name,
                    assets: release.assets.map(({ name, download_count }) => ({ name, download_count }))
                }
            });

            const htmlString = [];
            asset_downloads.forEach(item => {
                const assets = item.assets.map(asset => {
                    return (
                        `<div class='card asset'>
                            Name of Asset: <strong>${asset.name}</strong><br>
                            <p class="has-text-danger">Downloads: ${asset.download_count}</p>
                        </div>`
                    )
                })
                htmlString.push(
                        `<div>
                            <div><strong><u>Tag: ${item.name}</u></strong/></div>
                            <div class='assets'>
                                ${assets.join('')}
                            </div>
                        </div>`
                )
            })
            document.querySelector("#main").innerHTML = htmlString.join('');
            return asset_downloads;
        })
}