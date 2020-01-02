const url = "https://api.github.com/repos/athul/shelby/releases"

const vm = new Vue({
    el: '#app',
    data: {
        results: [],
    },
    mounted() {
        axios.get('https://api.github.com/repos/athul/shelby/releases')
            .then(response => {
                return response.data;
            }).then(data => {
                const asset_downloads = data.map(release => {
                    return {
                        name: release.tag_name,
                        assets: release.assets.map(({ name, download_count }) => ({ name, download_count }))
                    }
                });
                return asset_downloads;
            }).then(total_downloads => {
                this.results = JSON.stringify(total_downloads, null, 2);
                console.log(this.results)
            }).catch(error => {
                console.log(error);
            })
    }
});
console.log(vm)


