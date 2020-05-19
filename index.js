function getAnalytics() {
    let repVal = document.getElementById("search-input");
    let term = repVal.value;
    let URL = `https://api.github.com/repos/${term.replace(/\s+/g, '')}/releases`
    console.log(term.replace(/\s+/g, ''))
    axios.get(URL)
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
        }).then(data => {
            const asset_downloads = data.map(release => {
                return {
                    name: release.tag_name,
                    assets: release.assets.map(({ name, download_count }) => ({ name, download_count }))
                }
            });
            this.results = asset_downloads;

            let htmlString = [];
            asset_downloads.forEach(item => {
                let assets = item.assets.map(asset => {
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
                            </div>
        </footer>`
                )
            })
            document.querySelector("#main").innerHTML = htmlString.join('');
            return asset_downloads;
        })
}